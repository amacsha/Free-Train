//sends the user back to the login page if they are not authenticated

function auth(authFlag: boolean) {
  if (!authFlag) {
    window.location.replace("/");
  }
}

export default auth;
