function get_resources()
{
  // TODO make this update automatically
  var spreadsheet = SpreadsheetApp.openById("1jpeBgsbYnB1KJA5Ox5JietsNphwxLLe0p-c-onSlY1I").getSheetByName('2023');
  return spreadsheet
}

function main()
{
  var wait_thresholds = 7;
  var delay_threshold = 14;
  var late_threshold = 30;

  var emails = "olfactorybehaviorlab@gmail.com, pauley@psy.fsu.edu"
  var email_strings = 
    [
    'There has been no update in 7 days!',
    'It was delayed, and it has been 14 days since the order was palced!',
    'It is late, and it has been 30 days since the order was palced!'
    ]
  var spreadsheet = get_resources();

  var [waiting, delayed, late] = get_status(spreadsheet);
  var [waiting_dates, delayed_dates, late_dates] = get_dates(spreadsheet, waiting, delayed, late);
  var [waiting_vendors, delayed_vendors, late_vendors] = get_vendors(spreadsheet, waiting, delayed, late);
  print(delayed)
  print(late)
  check_date_send_email(emails, email_strings[0], wait_thresholds, waiting_dates, waiting_vendors)
  check_date_send_email(emails, email_strings[1], delay_threshold, delayed_dates, delayed_vendors)
  check_date_send_email(emails, email_strings[2], late_threshold, late_dates, late_vendors)
}



function check_date_send_email(emails, email_text, threshold, dates, vendors)
{
  var today = new Date();
  today.setHours(0,0,0,0);

  for(var i = 0; i < dates.length; i++)
  {
      var temp_date = new Date(dates[i])
      temp_date.setHours(0,0,0,0);

      var vendor = vendors[i].toString()
      var num_of_days = calculate_date_difference(today, temp_date)

      if(num_of_days == threshold)
      {
        // Check in on order from {Vendor} that was placed on {date}
        var email_string = "Check on the order placed on " + temp_date.toLocaleDateString("en-US") + " from vendor " + vendor + "! " + email_text;
        send_email(emails, "Order Alert!", email_string)
        print(email_string)
      }
  }
}
