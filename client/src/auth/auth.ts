//sends the user back to the login page if they are not authenticated

function auth(user) {
  if (user == null) {
    window.location.replace("/");
  }
}

export default auth;
