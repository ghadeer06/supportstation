import { supabase } from './supabase.js';

async function login() {
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const msgElement = document.getElementById("msg");

  // 1. تسجيل الدخول عبر نظام الحماية في سوبابيس
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (authError) {
    msgElement.innerText = "خطأ: " + authError.message;
    return;
  }

  // 2. جلب بيانات المستخدم (مثل الـ role) من جدولك الخاص
  const { data: userProfile, error: profileError } = await supabase
    .from('users')
    .select('role')
    .eq('id', authData.user.id) // نستخدم الـ ID الذي رجع من تسجيل الدخول
    .single();

  if (profileError || !userProfile) {
    msgElement.innerText = "فشل في جلب صلاحيات المستخدم";
    return;
  }

  // 3. التوجيه بناءً على الدور
  const routes = {
    'admin': 'admin.html',
    'trainer': 'trainer.html',
    'trainee': 'trainee.html'
  };

  window.location.href = routes[userProfile.role] || 'trainee.html';
}

// ربطها بـ window لتعمل مع onclick في HTML
window.login = login;
