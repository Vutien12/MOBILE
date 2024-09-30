import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import CustomTextInput from './CustomTextInput'; // Import the custom component

const PhoneNumberInput = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Hàm định dạng số điện thoại
  const formatPhoneNumber = (number) => {
    const cleaned = number.replace(/\D/g, ''); // Loại bỏ mọi ký tự không phải số
    let formattedNumber = '';

    if (cleaned.startsWith('84')) {
      formattedNumber = '+84 ';
      const remaining = cleaned.slice(2);
      formattedNumber += formatRemainingNumber(remaining);
    } else if (cleaned.startsWith('0')) {
      formattedNumber = '0';
      const remaining = cleaned.slice(1);
      formattedNumber += formatRemainingNumber(remaining);
    } else {
      formattedNumber = cleaned;
    }

    return formattedNumber.trim();
  };

  // Hàm định dạng phần còn lại của số điện thoại
  const formatRemainingNumber = (number) => {
    const part1 = number.substring(0, 3);
    const part2 = number.substring(3, 6);
    const part3 = number.substring(6, 9);
    let formatted = part1;
    if (part2) formatted += ` ${part2}`;
    if (part3) formatted += ` ${part3}`;
    return formatted;
  };

  // Hàm kiểm tra số điện thoại hợp lệ
  const validatePhoneNumber = (number) => {
    const cleaned = number.replace(/\D/g, '');
    return cleaned.length === 10 || cleaned.length === 11;
  };

  // Hàm xử lý khi nhấn nút "Tiếp tục"
  const handlePress = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert('Số điện thoại không hợp lệ', 'Vui lòng nhập số điện thoại đúng định dạng.');
      return;
    }
    console.log('Số điện thoại:', phoneNumber);
    // Tiếp tục với quy trình đăng nhập hoặc đăng ký
  };

  // Hàm xử lý khi thay đổi text
  const handleChangeText = (text) => {
    const cleaned = text.replace(/\s/g, ''); // Loại bỏ khoảng trắng
    const nonNumeric = /[^\d+]/.test(cleaned); // Kiểm tra xem có ký tự không phải số và dấu +
    if (nonNumeric) {
      setErrorMessage('Vui lòng nhập số');
    } else {
      setErrorMessage('');
    }

    const formattedText = formatPhoneNumber(cleaned);
    setPhoneNumber(formattedText);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.header}>Đăng nhập</Text>
      <View style={styles.shadowLine} />
      <Text style={styles.subHeader}>Nhập số điện thoại</Text>
      <Text style={styles.description}>
        Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
      </Text>

      {/* Sử dụng custom text input */}
      <CustomTextInput
        placeholder="Nhập số điện thoại của bạn"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={handleChangeText}
        maxLength={15} // Giới hạn độ dài tối đa để tránh nhập quá dài
      />

      {/* Hiển thị thông báo lỗi nếu có */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TouchableOpacity
        style={[
          styles.button,
          validatePhoneNumber(phoneNumber) ? styles.activeButton : styles.disabledButton,
        ]}
        onPress={handlePress}
        disabled={!validatePhoneNumber(phoneNumber)}
      >
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 20,
    top: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  shadowLine: {
    height: 2,
    backgroundColor: '#f0f0f0',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'normal',
    marginBottom: 10,
  },
  description: {
    fontSize: 10,
    marginBottom: 20,
  },
  errorText: {
    color: 'red', // Màu chữ của thông báo lỗi
    marginBottom: 10,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PhoneNumberInput;
