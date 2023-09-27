addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === 'POST') {
    const formData = await request.formData();
    const username = formData.get('username');
    const password = formData.get('password');
    
    if (isValidUser(username, password)) {
      return new Response('login success', {
				status: 200,
				headers: { 'Content-Type': 'text/plain'}
			} )
    } else {
      return new Response('Invalid credentials. Please try again.', {
        status: 401,
        headers: { 'Content-Type': 'text/plain' },
      });
    }
  } else {
    const loginPage = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Login Page</title>
      </head>
      <body>
        <h1>Login</h1>
        <form method="POST">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required><br>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required><br>
          <input type="submit" value="Login">
        </form>
      </body>
      </html>
    `;
    
    return new Response(loginPage, {
      headers: { 'Content-Type': 'text/html' },
    });
  }
}

function isValidUser(username, password) {
	if (username == USERNAME && password == PASSWORD){
		return true;
	}
	else{
		return false;
	}
}
