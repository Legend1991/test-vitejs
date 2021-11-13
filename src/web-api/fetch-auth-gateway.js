export default class FetchAuthGateway {
  async signIn(email, password) {
    try {
      const response = await fetch('http://localhost:8080/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ email, password }),
      });
      return response.json();
    } catch (error) {
      console.log('[AuthGateway.signIn] error:', error);
    }

    return {};
  }
}
