<div id="msg" class="msg"></div>

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
    window.location.href = "teachers_main_page.html";
  } else {
    window.location.href = "student_main_page.html";
  }
}

// مهم جداً:
window.login = login;

import { supabase } from './supabase.js';

async function login() {
  const email = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("msg");

  msg.textContent = "جاري التحقق...";

  try {
    // التحقق من الاتصال بـ Supabase
    if (!supabase) {
      msg.textContent = "خطأ: لم يتم الاتصال بقاعدة البيانات.";
      return;
    }

    // محاولة جلب المستخدم
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .maybeSingle();

    // خطأ من Supabase
    if (error) {
      msg.textContent = "خطأ في الاتصال بقاعدة البيانات.";
      console.error("Supabase Error:", error);
      return;
    }

    // المستخدم غير موجود
    if (!data) {
      msg.textContent = "خطأ: اسم المستخدم أو كلمة المرور غير صحيحة.";
      return;
    }

    // نجاح
    msg.textContent = "تم تسجيل الدخول بنجاح...";

    if (data.role === 'admin') {
      window.location.href = "admin.html";
    } else if (data.role === 'trainer') {
      window.location.href = "teachers_main_page.html";
    } else {
      window.location.href = "student_main_page.html";
    }

  } catch (err) {
    // أي خطأ غير متوقع
    msg.textContent = "حدث خطأ غير متوقع. يرجى المحاولة لاحقاً.";
    console.error("Unexpected Error:", err);
  }
}

// مهم جداً
window.login = login;
