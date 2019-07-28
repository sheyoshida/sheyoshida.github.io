var jsonifyForm = function(formArray) {//serialize data function

  var returnArray = {};
  for (var i = 0; i < formArray.length; i++){
    returnArray[formArray[i]['name']] = formArray[i]['value'];
  }
  // return JSON.stringify(returnArray);
  return returnArray;
}

$('#mailer input, #mailer textarea').focus(function() {
  console.log('focused ' + $(this).attr('name'));
  if ($(this).hasClass('invalid')) {
    $(this).removeClass('invalid');
  }
}).blur(function() {
  console.log('blurred ' + $(this).attr('name'));
});

$('#mailer').on('submit', function(event) {
  // stop the form from refreshing the page
  event.preventDefault();

  // check all the form fields and mark them invalid if they're empty
  $('#mailer input, #mailer textarea').each(function() {
    var _val = $(this).val();
    if (!_val || _val == '') {
      $(this).addClass('invalid');
    };    
  });

  // log how many invalid fields we found
  console.log($('.invalid').length);

  // if there are any invalid fields, don't proceed
  if ($('.invalid').length > 0) {
    return;
  }
  
  var _resultField = $('#result'),
      _form = $(this),
      _data = jsonifyForm(_form.serializeArray());

  console.log(_data);
  
  _form.addClass('loading');
  
  $.ajax({
//     replace this URL with [URL of your remixed Glitch project]/api/sendMail
    url: 'https://ancient-swallow.glitch.me//api/sendMail',
    type: 'POST',
    data: _data,
    cache: false,
    success: function(data) {
      console.log(data);
      _form.removeClass('loading').addClass('success');
      _resultField.text('Thanks for your message!');
    },
    error: function(xhr, status, err) {
      _form.removeClass('loading').addClass('error');
      _resultField.text(err);
      console.log(xhr, status, err);
    }
  });
});