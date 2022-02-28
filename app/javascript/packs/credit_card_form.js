$(document).on('ready turbolinks:load', function () {
  const submitHandler = (event) => {
    var $form = $(event.target);
    $form.find('input[type=submit]').prop('disabled', true);

    //If Stripe was initialized correctly this will create a token using the credit card info
    if (Stripe) {
      Stripe.card.createToken($form, stripeResponseHandler);
    } else {
      alert(
        'Failed to load credit card processing functionality. Please reload this page in your browser.'
      );
    }

    return false;
  };

  const stripeResponseHandler = (status, response) => {
    var token, $form;
    $form = $('.cc_form');

    if (response.error) {
      alert(response.error.message);
      $form.find('input[type=submit]').prop('disabled', false);
    } else {
      token = response.id;
      $form.append($('<input type="hidden" name="payment[token]" />').val(token));
      $('[data-stripe=number]').remove();
      $('[data-stripe=cvv]').remove();
      $('[data-stripe=exp-year]').remove();
      $('[data-stripe=exp-month]').remove();
      $('[data-stripe=label]').remove();
      $form.get(0).submit();
    }

    return false;
  };

  $('.cc_form').on('submit', submitHandler);
});
