import React from 'react';
import { 
  StyleSheet,
  View,
  Button,
  Text,
  Image,
} from 'react-native';
import { Dimensions } from 'react-native';
import { Icon } from 'react-native-vector-icons/Ionicons';

import jmk_headerlogo from '../assets/JMKHeaderLogoTemp.png';

function DesktopHeaderButtons({children}){
  return(
    <View style={styles.desktopheaderbuttons}>
      { children }
    </View>
  )
}

function MobileHeaderMenu({children}){
  return(
    <Icon name="menu-sharp" size={30} color="#00a0db" style={styles.mobileheadermenu} />
  );
}

export function Header() {
  const { width, height } = Dimensions.get('window');
  let desktop = (width > 900)
  return (
    <View
      style={styles.container}
    >
      <View style={styles.header_visible}>
        <View style={styles.header_left}>
          <Image
            style={styles.logo}
            source={jmk_headerlogo}
          />
        </View>
        <View style={styles.header_right}>
          { desktop
            ? <DesktopHeaderButtons>
                <Button style={styles.button} title={"test"}/>
              </DesktopHeaderButtons>
            : <MobileHeaderMenu>
                <Button style={styles.button} title={"test"}/>
              </MobileHeaderMenu>
          }
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    height: "10vh",
    backgroundColor: "#080808",
  },
  header_visible: {
    flex: -1,
    flexDirection: "row",
    minWidth: 1000,
    maxWidth: 1440,
  },
  header_right: {
    flex: 1,
    padding: "1em",
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
  },
  header_left: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    flex: 1,
    minWidth: 50,
    maxWidth: 300,
    minHeight: 100,
    maxHeight: 120,
    //resizeMode: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
  },
  text: {
    color: '#ffffff',
  },
  button: {
    flex: 1,
    maxHeight: 50,
    minHeight: 20,
  },
});

