'use strict';

// Close dialog with the customer, reporting fulfillmentState of Failed or Fulfilled ("Thanks, your pizza will arrive in 20 minutes")
function close(sessionAttributes, fulfillmentState, message) {
  return {
    sessionAttributes,
    dialogAction: {
      type: 'Close',
      fulfillmentState,
      message,
    },
  };
}

// --------------- Events -----------------------

function dispatch(intentRequest, callback) {
  console.log('request received');
  console.log(intentRequest);
  const sessionAttributes = intentRequest.sessionAttributes;
  const slots = intentRequest.currentIntent.slots;
  var cityname = slots.City;
  var agendaRequired = slots.Agenda;

  var content = 'The next council meeting in ' + cityname + ' will be on Thursday July 06, starting at 10AM, in City Hall. The chairman is Pauline Krikke. The agenda is available here: https://denhaag.raadsinformatie.nl/vergadering/322288/Raad%20%283%20dagdelen%29%2006-07-2017';

  callback(close(sessionAttributes, 'Fulfilled', {
      'contentType': 'PlainText',
      'content': content
  }));
}

// --------------- Main handler -----------------------

// Route the incoming request based on intent.
// The JSON body of the request is provided in the event slot.
exports.handler = (event, context, callback) => {
  try {
    dispatch(event,
      (response) => {
        callback(null, response);
      });
  } catch (err) {
    callback(err);
  }
};
