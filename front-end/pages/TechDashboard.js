import React from 'react';
import { StyleSheet, View,Image} from 'react-native';
import { Button, Layout, Card,Text} from '@ui-kitten/components';
import { useNavigation } from "@react-navigation/native";


export default function TechDashBoard({navigation}) {
  //const navigation = useNavigation();

  return (
    <Layout style={styles.center} level='1'>
        <Image style={styles.image} source={require("../assets/royal.png")} />
      
 <Layout style={styles.container} level='2'> 
  <Button style={styles.button} status='primary'>
      Today
    </Button> 
    <Button style={styles.button} status='success'>
      Tomorrow
    </Button>

    <Button style={styles.button} status='info'>
      Future
    </Button>

    <Button style={styles.button} status='warning'>
     <Text>Completed</Text>
    </Button>

  </Layout>
  </Layout>

  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems:'stretch'
  },
  button: {
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
    margin: 2,
    height: 30,
    width:80,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 2,
    padding: 6,
    justifyContent: 'center',
    backgroundColor: '#3366FF',
  },
  image: {
    width: 300,
    height: 50,
  },
  center: {
    flex: 1,
    alignItems: "center",
  }
});

/*
 const [shouldShow, setShouldShow] = useState(true);
onPress={() => setShouldShow(!shouldShow)}
 <Layout style={styles.container} level='2'> 
  <Button style={styles.button} status='primary' onPress={() => setShouldShow(!shouldShow)}>
      Today
    </Button> {Here we will return the view when state is true 
        and will return false if state is false}
        {shouldShow ?
          (
           //code hre
          ) : null}
          */