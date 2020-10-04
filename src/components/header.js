import React from 'react';
import { 
  StyleSheet,
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

function getHeaderButtons(){
  return ([
    {title: "Home", location: "Home"},
    {title: "About Us", location: "About Us"},
  ]);
}

function HeaderButtons({view_style, button_style}){
  let navigation = useNavigation();
  function redirect_to(location){
    return (() => navigation.reset({index: 0, routes: [{name: location}]}));
  }
  return(
    <View style={view_style}>
      { getHeaderButtons().map(
        (button, index) => (
          <Button
            title={button.title}
            style={button_style}
            key={index}
            onPress={redirect_to(button.location)}
          />
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

function MobileHeaderMenu(){
}

export function Header() {
  let mobilemenu_visible = false;
  let bigHeader = useMediaQuery({minWidth: 800});

  function toggle_mobilemenu(){
    mobilemenu_visible = !mobilemenu_visible;
    console.log("Menu is visible?: ", mobilemenu_visible);
  }

  return (
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
            ? <HeaderButtons
                view_style={styles.desktopheaderbuttons_view}
                button_style={styles.desktopheaderbuttons}
              />
            : <MobileHeaderMenuToggle toggle_menu={toggle_mobilemenu}>
                <Button style={styles.menu_button} title={"test"}/>
              </MobileHeaderMenuToggle>
          }
        </View>
        { mobilemenu_visible && 
          <HeaderButtons
            view_style={styles.mobileheaderbuttons_view}
            button_style={styles.mobileheaderbuttons}
          />
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  desktop_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    minHeight: "60px",
    backgroundColor: "#080808",
  },
  mobile_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    minHeight: "100px",
    backgroundColor: "#080808",
  },
  header_visible: {
    flex: -1,
    flexDirection: "row",
    maxWidth: 1440,
    width: "90%",
  },
  header_right: {
    flex: 1,
    padding: "1em",
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
  },
  header_left: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  desktopheaderbuttons_view: {
    flexDirection: "row",
  },
  desktopheaderbuttons: {
  },
  mobileheaderbuttons_view: {
    flexDirection: "column",
  },
  mobileheaderbuttons: {
  },
  mobilelogo: {
    flex: 1,
    height: 80,
    maxWidth: 250,
    resizeMode: 'center',
  },
  biglogo: {
    flex: 1,
    maxWidth: 300,
    height: 120,
    resizeMode: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
  },
  text: {
    color: '#ffffff',
  },
  menu_button: {
    flex: 1,
    maxHeight: 50,
    minHeight: 20,
  },
});

