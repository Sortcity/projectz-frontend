import AuthStyles from "@/components/Views/Auth/AuthStyles";
import InputForm from "@/components/Views/Auth/InputForm";
import mainStyles from "@/styles/mainStyles";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Demographics = () => {
  const router = useRouter();
  const { username } = useLocalSearchParams();
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleUpdate = async () => {
    try {
      if (!dob || !username || !gender) {
        alert("Please fill in all the fields.");
      }

      const response = await axios.post(
        "https://sortcity.ap-south-1.elasticbeanstalk.com:443/api/auth/verify",
        {
          username,
          dob,
          gender,
        },
        {
          headers: {
            "X-type": "update",
            "Content-Type": "application/json",
          },
        }
      );
      alert("User Updated Successfully. Please Login.");
      await delay(3000);
      router.replace({
        pathname: "/",
      });
    } catch (error) {
      console.error(error);
    }
  };
  const styles = AuthStyles();
  const mainStyle = mainStyles();
  return (
    <SafeAreaView style={mainStyle.parent}>
      <View style={styles.main}>
        <View>
          <View style={styles.formcon}>
            <Text style={styles.title}>Username</Text>
            <TextInput
              style={styles.form}
              value={username}
              editable="false"
              selectTextOnFocus="false"
            />
          </View>
          <InputForm
            FormName={"Date of Birth (dd-mm-yyyy)"}
            Placeholder={"Please enter in dd-mm-yyyy format.."}
            value={dob}
            setValue={setDob}
          />
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Select Gender</Text>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={{ height: 30, width: 100 }}
            >
              <Picker.Item label="Select..." value="" />
              <Picker.Item label="Male" value="MALE" />
              <Picker.Item label="Female" value="FEMALE" />
              <Picker.Item label="Non-Binary" value="NON_BINARY" />
            </Picker>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.btn} onPress={handleUpdate}>
            <Text style={styles.btntxt}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Demographics;
