String.prototype.trim = function( )
{
  return( this.replace(new RegExp("^([\\s]+)|([\\s]+)$", "gm"), "") );
}

// Trims the beinning white space from a string.
String.prototype.lefttrim = function( )
{
  return( this.replace(new RegExp("^[\\s]+", "gm"), "") );
}

// Trims the trailing white space from a string.
String.prototype.righttrim = function( )
{
  return( this.replace(new RegExp("[\\s]+$", "gm"), "") );
}

