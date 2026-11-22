(() => {
  'use strict';

  const SUPABASE_URL = 'https://qyuczfpgydgqywgthgrz.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_2NLEuDREplLS9DgUXeA8Tw_f8MJOhCq';
  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  let currentUser = null;
  let isSignUp = false;

  const $ = id => document.getElementById(id);
  const loginBtn = $('loginBtn');
  const loginModal = $('loginModal');
  const closeModal = $('closeLoginModal');
  const form = $('loginForm');
  const email = $('loginEmail');
  const password = $('loginPassword');
  const submit = $('authSubmitBtn');
  const message = $('authMessage');
  const title = $('authTitle');
  const sub = $('authSub');
  const toggle = $('toggleAuthMode');
  const toggleText = $('toggleText');
  const forgot = $('forgotPassword');
  const avatar = $('userAvatar');
  const buttonText = $('loginBtnText');

  function showMessage(text, type = 'error') {
    message.textContent = text;
    message.className = `auth-message ${type}`;
  }
  function hideMessage() {
    message.textContent = '';
    message.className = 'auth-message';
  }
  function openModal() {
    loginModal.classList.add('active');
    loginModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('auth-modal-open');
    hideMessage();
    window.setTimeout(() => email.focus(), 50);
  }
  function closeModalFunc() {
    loginModal.classList.remove('active');
    loginModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('auth-modal-open');
    hideMessage();
  }
  function updateUI(user) {
    if (user) {
      const name = user.email ? user.email.split('@')[0] : 'User';
      loginBtn.classList.add('logged-in');
      buttonText.textContent = name;
      avatar.textContent = name.charAt(0).toUpperCase();
      loginBtn.title = 'Click to log out';
      loginBtn.setAttribute('aria-label', `Log out ${name}`);
    } else {
      loginBtn.classList.remove('logged-in');
      buttonText.textContent = 'Login';
      avatar.textContent = '◌';
      loginBtn.title = 'Log in';
      loginBtn.setAttribute('aria-label', 'Log in');
    }
  }
  function setMode(signUp) {
    isSignUp = signUp;
    title.textContent = isSignUp ? 'Create account' : 'Sign in';
    sub.textContent = isSignUp ? 'Join the signal network' : 'Enter your credentials to continue';
    submit.textContent = isSignUp ? 'Sign up' : 'Sign in';
    toggleText.textContent = isSignUp ? 'Already have an account?' : 'New here?';
    toggle.textContent = isSignUp ? 'Sign in' : 'Sign up';
    form.reset();
    hideMessage();
  }
  async function login(value, secret) {
    const { data, error } = await client.auth.signInWithPassword({ email: value, password: secret });
    if (error) throw error;
    currentUser = data.user;
    updateUI(currentUser);
    showMessage(`Welcome back, ${value.split('@')[0]}!`, 'success');
    window.setTimeout(closeModalFunc, 800);
  }
  async function signUp(value, secret) {
    const { data, error } = await client.auth.signUp({
      email: value,
      password: secret,
      options: { emailRedirectTo: window.location.origin + window.location.pathname }
    });
    if (error) throw error;
    if (data.user && data.user.identities && data.user.identities.length === 0) {
      showMessage('This email is already registered. Please sign in.', 'error');
    } else if (!data.session) {
      showMessage('Please check your email to confirm your account.', 'info');
    } else {
      currentUser = data.user;
      updateUI(currentUser);
      showMessage(`Account created! Welcome, ${value.split('@')[0]}!`, 'success');
      window.setTimeout(closeModalFunc, 800);
    }
  }
  function friendlyError(error) {
    const text = error && error.message ? error.message : 'Authentication failed.';
    if (text.includes('Invalid login credentials')) return 'Invalid email or password.';
    if (text.includes('Email not confirmed')) return 'Please verify your email address first.';
    if (text.includes('User already registered')) return 'This email is already registered. Please sign in.';
    return text;
  }

  loginBtn.addEventListener('click', async () => {
    if (!currentUser) return openModal();
    if (window.confirm('Log out of Muse / Index?')) {
      const { error } = await client.auth.signOut();
      if (error) console.error('Logout error:', error);
    }
  });
  closeModal.addEventListener('click', closeModalFunc);
  loginModal.addEventListener('click', event => { if (event.target === loginModal) closeModalFunc(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && loginModal.classList.contains('active')) closeModalFunc(); });
  toggle.addEventListener('click', () => setMode(!isSignUp));
  forgot.addEventListener('click', async () => {
    const value = email.value.trim();
    if (!value) { showMessage('Enter your email address first.', 'error'); email.focus(); return; }
    try {
      const { error } = await client.auth.resetPasswordForEmail(value, { redirectTo: window.location.origin + window.location.pathname });
      if (error) throw error;
      showMessage('Password reset email sent. Check your inbox.', 'info');
    } catch (error) { showMessage(friendlyError(error), 'error'); }
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const value = email.value.trim();
    const secret = password.value;
    if (!value || !secret) { showMessage('Please fill in all fields.', 'error'); return; }
    submit.disabled = true;
    submit.textContent = isSignUp ? 'Creating…' : 'Signing in…';
    hideMessage();
    try {
      if (isSignUp) await signUp(value, secret);
      else await login(value, secret);
    } catch (error) { showMessage(friendlyError(error), 'error'); }
    finally { submit.disabled = false; submit.textContent = isSignUp ? 'Sign up' : 'Sign in'; }
  });
  client.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' || event === 'USER_UPDATED') { currentUser = session && session.user; updateUI(currentUser); }
    if (event === 'SIGNED_OUT') { currentUser = null; updateUI(null); }
  });
  (async () => {
    try {
      const { data: { session } } = await client.auth.getSession();
      currentUser = session && session.user;
      updateUI(currentUser);
    } catch (error) { console.error('Session check error:', error); updateUI(null); }
  })();
})();
