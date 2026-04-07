import { supabase } from "./supabase.js";
console.log("login.js LOADED");

async function login() {
  console.log("login() CALLED");

  const email = document.getElementById("email").value.trim();   // ← هنا التعديل
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("msg");

  msg.textContent = "جاري التحقق...";

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .maybeSingle();

    if (error) {
      msg.textContent = "خطأ في الاتصال بقاعدة البيانات.";
      console.error(error);
      return;
    }

    if (!data) {
      msg.textContent = "خطأ: البريد أو كلمة المرور غير صحيحة.";
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
    msg.textContent = "حدث خطأ غير متوقع.";
    console.error(err);
  }
}

window.login = login;
