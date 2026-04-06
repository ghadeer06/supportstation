import { supabase } from './supabase.js';

async function login() {
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .single();

  if (error || !data) {
    alert("خطأ في تسجيل الدخول");
    return;
  }

  if (data.role === 'admin') {
    window.location.href = "admin.html";
  } else if (data.role === 'trainer') {
    window.location.href = "trainer.html";
  } else {
    window.location.href = "trainee.html";
  }
}

// مهم جداً جداً:
window.login = login;
