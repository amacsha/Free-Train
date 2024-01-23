//sends the user back to the login page if they are not authenticated

function auth(user: string | null) {
  console.log(user)
  if (user == null) {
    console.log('teest2')
    window.location.replace("/");
  }
}

export default auth;
