import React, {useState} from 'react';
import { 
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useMediaQuery } from 'react-responsive';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { selectAuthPermissions } from '../modules/auth/authSlice.js';
import { selectUserName } from '../modules/users/userSlice.js';
import jmk_bigheaderlogo from '../assets/JMKHeaderLogoTemp.png';
import jmk_smallheaderlogo from '../assets/JMKHeaderLogoTempMobile.png';
import { getHeaderButtons, getProfilePage } from '../pages.js';
import {
  desktop_styles,
  mobile_styles,
  desktopHeaderButtons_styles,
  mobileHeaderButtons_styles
} from './headerStyles.js'

function HeaderButtons({style}){
  let navigation = useNavigation();
  let auth_permissions = useSelector(selectAuthPermissions);
  function redirect_to(location){
    return (() => {
      navigation.reset({index: 0, routes: [{name: location}]});
    });
  }
  return(
    <View style={style.view}>
      { getHeaderButtons(auth_permissions).map(
        (page_title, index) => (
          <TouchableOpacity
            style={style.button}
            key={index}
            onPress={redirect_to(page_title)}
          >
            <View style={style.textview}>
              <Text style={style.text}>{page_title}</Text>
            </View>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}

function MobileHeaderMenuToggle({toggle_menu, style}){
  return(
    <TouchableOpacity onPress={toggle_menu} style={style.menutoggle}>
      <MaterialIcons name="menu" size={30} color="#00a0db"/>
    </TouchableOpacity>
  );
}

function ProfileButton({style}) {
  let navigation = useNavigation();
  let auth_permissions = useSelector(selectAuthPermissions);
  let user_name = useSelector(selectUserName);

  return ( 
    <TouchableOpacity
      onPress={() => navigation.reset(
        {index: 0, routes: [{name: getProfilePage(auth_permissions)}]}
      )}
      style={style.profile_button}
    >
      <MaterialIcons name="account-circle" size={30} color="#00a0db"/>
      <Text style={style.profile_name_text}>
        { user_name.length ? user_name[0] : null }
      </Text>
    </TouchableOpacity>
  );
}

export function Header() {
  let [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  let bigHeader = useMediaQuery({minWidth: 870});
  if(bigHeader && mobileMenuVisible){
    setMobileMenuVisible(false);
  }

  function toggle_mobilemenu(){
    setMobileMenuVisible(!mobileMenuVisible);
  }

  let styles = bigHeader ? desktop_styles : mobile_styles;
  let header_logo = bigHeader ? jmk_bigheaderlogo : jmk_smallheaderlogo;

  let navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View
        style={styles.header_container}
      >
        <View style={styles.header_visible}>
          <View style={styles.header_left}>
            <TouchableOpacity style={styles.logo} onPress={() => navigation.reset({index: 0, routes: [{name: "Home"}]})}>
              <Image
                style={styles.logo}
                source={header_logo}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.header_right}>
            { bigHeader
              ? <HeaderButtons style={desktopHeaderButtons_styles}/>
              : <MobileHeaderMenuToggle
                  toggle_menu={toggle_mobilemenu}
                  style={styles}
                />
            }
            <ProfileButton style={styles}/>
          </View>
        </View>
      </View>
      { mobileMenuVisible  
        ? <HeaderButtons style={mobileHeaderButtons_styles}/>
        : <></>
      }
    </View>
  );
}

