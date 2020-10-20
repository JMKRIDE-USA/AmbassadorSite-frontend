// returns now + timedelta (string, e.g. 2d, 3h, etc)
export function getDateAfter(timedelta){
  const now = Date.now()
  let unit = timedelta.charAt(timedelta.length - 1);
  let amount = parseInt(timedelta.slice(0, -1));
  switch( unit ) {
    case 'd': {
      return now + (amount * 60 * 60 * 24);
    }
    case 'h': {
      return now + (amount * 60 * 60);
    }
    case 'm': {
      return now + (amount * 60);
    }
    case 's': {
      return now + amount;
    }
  }
}
