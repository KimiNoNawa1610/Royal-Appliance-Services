import React, {useEffect, useState} from "react";
import {StyleSheet, View,} from "react-native";
import { Button, Card, Layout, Text } from '@ui-kitten/components';
import axios from 'axios';

const TechRender = ({item})=>{

    return(
        <View style={styles.techContainer}>
            <Card>
                <View>
                    <Text style={styles.techName}>{item["name"]}</Text>
                </View>
                <View>
                    <Text>Email: {item["email"]}</Text>
                    <Text>Password: {item["password"]}</Text>
                </View>
            </Card>
        </View>
    );
};

const ViewTechs = () => {
    const [techData, setTechData] = useState([]);
    useEffect(()=>{
        const getTechs = async () => {
            const response = await axios.get('http://localhost:3002/allTechs');
            setTechData(response.data);
        };
        getTechs();
    },[]);

    return (
      <Layout>
          <Layout style={styles.titleLayout}>
              <Text style={styles.titleText}>Current Employees</Text>
          </Layout>
          <Layout>
            <>{techData.map((item, i) => <TechRender key={i} item={item}></TechRender>)}</>
          </Layout>
      </Layout>
    );
}

const styles = StyleSheet.create({
    techContainer: {
        flex: 1,
        marginBottom: 5
    },
    techName: {
        fontSize: 30
    },
    titleLayout:{
        marginBottom: 20,
    },
    titleText:{
        fontSize: 40,

    }
});
export default ViewTechs;