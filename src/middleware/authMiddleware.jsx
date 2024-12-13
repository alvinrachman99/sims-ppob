const AuthMiddleware = (store) => (next) => (action) => {
    console.log('middleware:')
    console.log(action)
    // Proses login
    if (action.type === 'auth/login/fulfilled') {
        // Menyimpan token di localStorage setelah login berhasil
        if (action.payload?.token) {
        localStorage.setItem('token', action.payload.token);
        }
    }

    // Proses logout
    if (action.type === 'auth/logout/fulfilled') {
        // Menghapus token dari localStorage saat logout
        localStorage.removeItem('token');
    }

    // Lanjutkan ke reducer berikutnya
    return next(action);
};

export default AuthMiddleware;
  