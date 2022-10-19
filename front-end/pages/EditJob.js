import React, {useState} from 'react';
import {
    Button,
    StyleSheet,
    TextInput,
    Text,
    View,
    VirtualizedList,
    Alert, StatusBar
}
    from 'react-native';

const DATA =
    [
        {detailTitle : "PH: PreExsiting_Detail_0"},
        {detailTitle : "PH: PreExsiting_Detail_1"},
        {detailTitle : "PH: PreExsiting_Detail_2"},
        {detailTitle : "PH: PreExsiting_Detail_0"},
        {detailTitle : "PH: PreExsiting_Detail_1"},
        {detailTitle : "PH: PreExsiting_Detail_2"},
        {detailTitle : "PH: PreExsiting_Detail_0"},
        {detailTitle : "PH: PreExsiting_Detail_1"},
        {detailTitle : "PH: PreExsiting_Detail_2"},
        {detailTitle : "PH: PreExsiting_Detail_0"},
        {detailTitle : "PH: PreExsiting_Detail_1"},
        {detailTitle : "PH: PreExsiting_Detail_2"},
        {detailTitle : "PH: PreExsiting_Detail_0"},
        {detailTitle : "PH: PreExsiting_Detail_3"}
    ];

const getPreData = () => {
    /* Reference
    Invoice =
    {
        id
        total
        my_part
        labor
        tax
        shipping
        net
        part_installed
        client_sell
        paid_by
    }
    */
    //TODO: Call to the backend to get pre-existing data on a {Job}
}

const getJobDetail = (data, index) => {
    return data[index];
};

const getJobDetailCount = (data) =>{
    return data.length;
}



const JobDetail = ({jobDetail}) => {
    const [detail, onChangeDetail] = React.useState(jobDetail["detailTitle"]);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Job Detail</Text>
            <TextInput
                style={styles.input}
                value={detail}
                onChangeText={onChangeDetail}
                placeholderTextColor={'#fff'}
            />
        </View>
    )};



const EditJob = () => {
    return (
        <View>
            <View name = "Text" style={styles.title}>
                <Text style={styles.bigText}>Edit Job</Text>
            </View>


            <View name="Pre-Existing Data" style={styles.existing}>
                <VirtualizedList
                    data={DATA}
                    initialNumToRender={4}
                    renderItem={   ({ item }) => <JobDetail jobDetail={item} />   }
                    keyExtractor={item => item.key}
                    getItem={getJobDetail}
                    getItemCount={getJobDetailCount}
                />
            </View>


            <View name = "Data to Add">

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
    },
    existing:{
        borderRadius: 5,
        backgroundColor: '#163352',
        padding: 15,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        borderColor: '#fff',
        color: '#fff',
    },
    title: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 15,
        color: '#fff'
    },
    bigText: {
        fontSize: 32,
        color: '#fff'
    }
});

export default EditJob;