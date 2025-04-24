import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('th');

  const texts = {
    en: {
      title: 'TERMS OF SERVICE',
      cancel: 'Decline',
      agree: 'Accept',
      description: [
        '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
      ],
      idnameuser: 'ID name user',
      passworduser: 'Password',
      confirmpassworduser: 'Confirm Password',
      savelogin: 'save login',
      forgotPassword: 'forgot Password?',
      login: 'login',
      notaccount: 'No user account',
      newaccount: 'Create an account to register a user account',
      userregistration: 'User Registration',
      register: 'register',
      passwordmismatch: 'Passwords do not match',
      registrationfailed: 'Registration failed',
      textfillinputtext:'Please fill in the information',
      phonenumber:'Phone number',
      textsendotp:'The OTP will be sent to the phone number',
      enterphone:'Enter your phone number',
      callphone:'If the phone number is incorrect, please contact 02-xxx-xxxx',
      requestotp:'Request OTP code',
      verifyidentity:'Verify identity',
      enterotp:'Enter the OTP sent to your phone',
      confirmotp:'Confirm OTP',
      getnewotptext:'If you did not receive the otp?',
      resendotp:'Resend OTP',
      setpin:'Set PIN CODE',
      confirmpin:'Confirm PIN CODE',
      pleaseenterpin:'Please enter your PIN',
      setupfingerprintlogin:'Set up fingerprint login',
      forquickeraccess:'For quicker access',
      setfingerprint:'Set Fingerprint',
      skip:'Skip',
      enterregister:'Please enter your registered \nemail or phone number',
      emailornumber:'Email/Phone',
      send:'Send',
      emailnotfound:'Email not found',
      enteremail:'Please enter a valid email',
      success:'Success',
      resetsuccess:'Your password has been reset successfully',
      ok:'OK',
      enterPin:'Please enter your PIN',
      textpinortouchid:'Log in with Touch ID or cancel to return to PIN entry',
      logout:'Log out',
      welcome:'Welcome!\n',
    },
    th: {
      title: 'เงื่อนไขการใช้บริการ',
      cancel: 'ปฏิเสธ',
      agree: 'ยอมรับ',
      description: [
        '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
      ],
      idnameuser: 'ชื่อผู้ใช้งาน',
      passworduser: 'รหัสผ่าน',
      confirmpassworduser: 'ยืนยันรหัสผ่าน',
      savelogin: 'บันทึกการเข้าสู่ระบบ',
      forgotPassword: 'ลืมรหัสผ่าน?',
      login: 'เข้าสู่ระบบ',
      notaccount: 'ไม่มีบัญชีผู้ใช้',
      newaccount: 'เปิดบัญชีเพื่อลงทะเบียนบัญชีผู้ใช้',
      userregistration: 'ลงทะเบียนบัญชีผู้ใช้',
      register: 'สมัครสมาชิก',
      passwordmismatch: 'รหัสผ่านไม่ตรงกัน',
      registrationfailed: 'ไม่สามารถทำการสมัครสมัครได้',
      textfillinputtext:'กรุณากรอกข้อมูล',
      phonenumber:'เบอร์โทรศัพท์',
      textsendotp:'OTP จะถูกส่งไปที่เบอร์โทรศัพท์',
      enterphone:'กรุณากรอกเบอร์มือถือ',
      callphone:'กรณีเบอร์โทรศัพท์ไม่ถูกต้องกรุณาติดต่อเบอร์ 02-xxx-xxxx',
      requestotp:'ขอรหัส OTP',
      verifyidentity:'ยืนยันตัวตน',
      enterotp:'กรุณากรอกรหัสยืนยันที่เราได้ส่งให้คุณ',
      confirmotp:'ยืนยัน OTP',
      getnewotptext:'หากคุณไม่ได้รับรหัส?',
      resendotp:'ส่งรหัสใหม่',
      setpin:'ตั้งรหัส PIN CODE',
      confirmpin:'ยืนยันรหัส PIN CODE',
      pleaseenterpin:'กรุณาใส่รหัส PIN',
      setupfingerprintlogin:'ตั้งค่าล็อคอินด้วยลายนิ้วมือ',
      forquickeraccess:'เพื่อการเข้าถึงที่รวดเร็วขึ้น',
      setfingerprint:'ตั้งค่าลายนิ้วมือ',
      skip:'ข้าม',
      enterregister:'กรุณากรอกอีเมลหรือเบอร์โทรศัพท์ที่\nลงทะเบียน',
      emailornumber:'อีเมล/เบอร์โทรศัพท์',
      send:'ส่ง',
      emailnotfound:'ไม่พบอีเมล',
      enteremail:'กรุณากรอกอีเมลใหม่',
      success:'สำเร็จ',
      resetsuccess:'รีเซ็ตรหัสผ่านของคุณสำเร็จแล้ว',
      ok:'ตกลง',
      enterPin:'กรุณากรอกรหัส PIN',
      textpinortouchid:'เข้าใช้งานด้วย Touch ID หรือ ยกเลิกเพื่อกลับไปใช้รหัส PIN',
      logout:'ออกจากระบบ',
      welcome:'ยินดีต้อนรับ!\n',
    },
  };

  const value = {
    language,
    setLanguage,
    texts: texts[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};