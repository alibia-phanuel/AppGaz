import { View, TextInput } from "react-native";

interface FormFieldProps {
  value: string;
  handleChangeText: (e: string) => void;
  otherStyles: string;
  placeholder?: string;
  enableKeyboardType?: boolean; // Nouvelle propriété
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "url"; // Les options possibles
}

const FormField = ({
  value,
  placeholder,
  otherStyles,
  handleChangeText,
  enableKeyboardType,
  keyboardType,
  ...props
}: FormFieldProps) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View className="w-full h-16 px-2 bg-black-100 rounded-lg  mt-4 border border-black-500 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-gray-500 font-psemibold text-base w-full"
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          {...(enableKeyboardType && { keyboardType })} // Appliquer uniquement si activé
          {...props}
        />
      </View>
    </View>
  );
};

export default FormField;
