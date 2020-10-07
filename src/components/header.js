import React, {useState} from 'react';
import { 
  View,
  Button,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useMediaQuery } from 'react-responsive';
import { useNavigation } from '@react-navigation/native';

import jmk_bigheaderlogo from '../assets/JMKHeaderLogoTemp.png';
import jmk_smallheaderlogo from '../assets/JMKHeaderLogoTempMobile.png';
import { getHeaderButtons } from '../pages.js';
import {
  styles,
  desktopHeaderButtons_styles,
  mobileHeaderButtons_styles
} from './headerStyles.js'

function HeaderButtons({style}){
  let navigation = useNavigation();
  function redirect_to(location){
    return (() => {
      navigation.reset({index: 0, routes: [{name: location}]});
    });
  }
  return(
    <View style={style.view}>
      { getHeaderButtons().map(
        (button, index) => (
          <TouchableOpacity
            style={style.button}
            key={index}
            onPress={redirect_to(button.destination)}
          >
            <View style={style.button_style}>
              <Text style={style.button_text}>{button.title}</Text>
            </View>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}

function MobileHeaderMenuToggle({toggle_menu}){
  return(
    <TouchableOpacity onPress={toggle_menu}>
      <MaterialIcons name="menu" size={30} color="#00a0db" style={styles.mobileheadermenu}/>
    </TouchableOpacity>
  );
}

export function Header() {
  let [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  let bigHeader = useMediaQuery({minWidth: 800});
  if(bigHeader && mobileMenuVisible){
    setMobileMenuVisible(false);
  }

  function toggle_mobilemenu(){
    setMobileMenuVisible(!mobileMenuVisible);
  }

  return (
    <View style={{flexDirection: "column"}}>
      <View
        style={bigHeader ? styles.desktop_container : styles.mobile_container}
      >
        <View style={styles.header_visible}>
          <View style={styles.header_left}>
            { bigHeader
              ? <Image
                  style={styles.biglogo}
                  source={jmk_bigheaderlogo}
                />
              : <Image
                  style={styles.mobilelogo}
                  source={jmk_smallheaderlogo}
                />
            }
          </View>
          <View style={styles.header_right}>
            { bigHeader
              ? <HeaderButtons style={desktopHeaderButtons_styles}/>
              : <MobileHeaderMenuToggle toggle_menu={toggle_mobilemenu}>
                  <Button style={styles.menu_button} title={"test"}/>
                </MobileHeaderMenuToggle>
            }
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

