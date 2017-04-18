var daysInMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

  function dayOfMonth() {
    var d = new Date();
    var n = d.getDate();
    return n;
}

function dayOfWeek(){
  var d = new Date();
    var n = d.getDay();
    return n;
}

function month(){
  var d = new Date();
  var n = d.getMonth();
  return n;
}

function year(){
  var d = new Date();
  var n = d.getFullYear();
  return n;
}

function dateByDay( supDay ){
  gotYear = year();
  gotMonth = month();
  gotDay = dayOfMonth();
  weekDay = dayOfWeek();
  if( gotYear%4 == 0 ){
    daysInMonth[1] = 29;
  }
  if( weekDay < supDay ){
    while( weekDay < supDay ){
      weekDay = weekDay+1;
      gotDay = gotDay+1;
    }
  }
  if( weekDay > supDay ){
    while( weekDay > supDay ){
      weekDay = weekDay - 1;
      gotDay = gotDay - 1;
    }
  }
  if( gotDay > daysInMonth[gotMonth] ){
    gotDay = gotDay - daysInMonth[gotMonth];
    gotMonth = gotMonth+1;
    if( gotMonth > 11 ){
      gotYear++;
    }
  }
  if( gotDay < 1 ){
    gotMonth--;
    if( gotMonth < 0 ){
      gotMonth = 12 + gotMonth;
      gotYear--;
    }
    gotDay = daysInMonth[gotMonth] + gotDay;
  }

  daysInMonth[1] = 28;
  return gotMonth+1 + "/" + gotDay;
}

document.getElementById("monday").innerHTML = dateByDay( 1 );
document.getElementById("tuesday").innerHTML = dateByDay( 2 );
document.getElementById("wednesday").innerHTML = dateByDay( 3 );
document.getElementById("thursday").innerHTML = dateByDay( 4 );
document.getElementById("friday").innerHTML = dateByDay( 5 );