function send_email(emails, subject, text)
{
  MailApp.sendEmail(emails, subject, text)
  Logger.log("Notification Sent to: " + emails)
}

function convert_date(input_date)
{
  var output_format = "yyyy-MM-dd";
  var formatted_date = Utilities.formatDate(input_date, "GMT-4", output_format);

  return formatted_date;
}

function print(text)
{
  Logger.log(text)
}

function get_status(spreadsheet)
{
  var statuses = spreadsheet.getRange(2, 7, spreadsheet.getLastRow()-1, 1).getValues();
  
  var waiting = [];
  var delayed = [];
  var late = [];
  for(var i = 0; i < statuses.length; i++)
  {
    var current = statuses[i].toString();
    
    if(current == 'Waiting')
      waiting.push(i);
    else if(current == 'Delayed')
      delayed.push(i);
    else if(current == 'LATE')
      late.push(i);
  }

  return [waiting, delayed, late]
}

function get_vendors(spreadsheet, waiting, delayed, late)
{
  var vendors = spreadsheet.getRange(2, 4, spreadsheet.getLastRow()-1, 1).getValues();

  var waiting_vendors = [];
  var delayed_vendors = [];
  var late_vendors = [];

  for (index in waiting)
  {
    var vendor = vendors[waiting[index]];
    waiting_vendors.push(vendor)
  }
    for (index in delayed)
  {
    var vendor = vendors[delayed[index]];
    delayed_vendors.push(vendor)
  }
    for (index in late)
  {
    var vendor = vendors[late[index]];
    late_vendors.push(vendor)
  }

  return [waiting_vendors, delayed_vendors, late_vendors]

}

function get_dates(spreadsheet, waiting, delayed, late)
{
  var dates = spreadsheet.getRange(2, 1, spreadsheet.getLastRow()-1, 1).getValues();

  var waiting_dates = [];
  var delayed_dates = [];
  var late_dates = [];

  for (index in waiting)
  {
    var current_date = dates[waiting[index]];
    waiting_dates.push(current_date);
  }
    for (index in delayed)
  {
    var current_date = dates[delayed[index]];
    delayed_dates.push(current_date);
  }
    for (index in late)
  {
    var current_date = dates[late[index]];
    late_dates.push(current_date);
  }

  return [waiting_dates, delayed_dates, late_dates]

}

function calculate_date_difference(today, date2)
{
  var date_delta_msec = today.getTime() - date2.getTime();
  var difference_in_days = Math.round((date_delta_msec / (1000 * 60 * 60 * 24))); // 1000 msec/s* 60 s/min * 60 min/hr * 2hr/day

  return difference_in_days
}
