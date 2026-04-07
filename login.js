console.log("login.js LOADED");

import { supabase } from './supabase.js';

async function login() {
  console.log("login() CALLED");

  const email = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("msg");

  msg.textContent = "جاري التحقق...";

  try {
    if (!supabase) {
      msg.textContent = "خطأ: لم يتم الاتصال بقاعدة البيانات.";
      return;
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .maybeSingle();

    if (error) {
      msg.textContent = "خطأ في الاتصال بقاعدة البيانات.";
      console.error("Supabase Error:", error);
      return;
    }

    if (!data) {
      msg.textContent = "خطأ: اسم المستخدم أو كلمة المرور غير صحيحة.";
      return;
    }

    msg.textContent = "تم تسجيل الدخول بنجاح...";

    if (data.role === 'admin') {
      window.location.href = "admin.html";
    } else if (data.role === 'trainer') {
      window.location.href = "teachers_main_page.html";
    } else {
      window.location.href = "student_main_page.html";
    }

  } catch (err) {
    msg.textContent = "حدث خطأ غير متوقع. يرجى المحاولة لاحقاً.";
    console.error("Unexpected Error:", err);
  }
}

// مهم جداً
window.login = login;
