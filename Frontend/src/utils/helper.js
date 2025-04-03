// Function to get initials from a given name
export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");

  let initials = "";
  // Loop through the first two words (or fewer if there are less than two)
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }
  // Return the initials in uppercase
  return initials.toUpperCase();
};

// Function to validate an email address using a regular expression
export const validateEmail = (email) => {
  // Regular expression that checks for a valid email format:
  // - At least one non-space character before the @
  // - At least one non-space character between the @ and the .
  // - At least one non-space character after the .
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Return true if email matches the regex pattern; otherwise, false
  return regex.test(email);
};
