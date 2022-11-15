import React, { useState }  from 'react';
import EditableTable from 'react-native-editable-table';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, Input } from "@ui-kitten/components";
import DropDownPicker from 'react-native-dropdown-picker';


const EditableInvoice = () =>{
  const [report, setReport] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'VISA', value: 'VISA'},
    {label: 'M/C', value: 'M/C'},
    {label: 'AMEX',value:'AMEX'},
    {label: 'DISC',value:'DISC'},
  ]);

  return (
    
    <SafeAreaView style={styles.container}>
      <EditableTable
        columns={[
          {value: '', input: 'c1', width: 40, sortable: false, defaultSort: 'ASC', reorder: true},
          {value: '', input: 'c2', width: 40, sortable: false},
          {value: '', input: 'c3', width: 40, sortable: false},
          {value: '', input: 'c4', width: 40, sortable: false},
          {value: '', input: 'c5', width: 40, sortable: false},
          {value: '', input: 'c6', width: 40, sortable: false},
          {value: '', input: 'c7', width: 40, sortable: false},
          {value: '', input: 'c8', width: 40, sortable: false},
        ]}
        values={[
          ["CUSTOMER", {value:"", editable: true} , "DATE", {value:"", editable: true},"PHONE",{value:"", editable: true}],
          ["STREET", {value: '', editable: true, span:3}, "CITY", {value:"", editable: true}],
          ["LABOR WARRANTY",  {value:"", editable: true}, 'MATERIAL WANRRANTY', {value:"", editable: true}],
          ["ITEM TO BE SERVICED",{value:"", editable: true},"MAKE",{value:"", editable: true},"MODEL NO.",{value:"", editable: true}, "SERIAL NO.",{value:"", editable: true}],
          ["CUSTOMER COMPLAINT",{value: '', editable: true, span:5}],
          ["EMAIL ADDRESS",{value: '', editable: true, span:2},"WORK ORDER NUMBER",{value: '', editable: true},"AUTHORIZATION NUMBER",{value: '', editable: true}],
          ["JOB ESTIMATE $",{value: '', editable: true, span:2},"TECHNICIAN NAME",{value: '', editable: true, span:2}],
        ]}
        onCellChange={(value, column, row, unique_id) => {
          console.log(`Cell Change on Column: ${column} Row: ${row}
                      and unique_id: ${unique_id}`);
          
        }}
        onColumnChange={(value, oldVal, newVal) => {
          console.log(`Column Change. Old Value: ${oldVal} New Value: ${newVal}`)
        }}
        customStyles={{

        }}
        style={styles.table}
      />

      <EditableTable
        columns={[
          {value: 'QUANTITY', input: 'c1', width: 7, sortable: false, defaultSort: 'ASC'},
          {value: 'PARTS AND MATERIAL', input: 'c2', width: 30, sortable: false},
          {value: 'AMOUNT', input: 'c3', width: 10, sortable: false},
          {value: 'AMOUNT', input: 'c4', width: 10, sortable: false},
          {value: 'SUMMARY OF CHARGES', input: 'c5', width: 20, sortable: false},
          {value: '', input: 'c6', width: 10, sortable: false},
          {value: '', input: 'c7', width: 10, sortable: false},
        ]}
        values={[
          [{value:"", editable: true},{value:"", editable: true},{value:"", editable: true},{value:"", editable: true},"MATERIAL",{value:"", editable: true},{value:"", editable: true}],
          [{value:"", editable: true},{value:"", editable: true},{value:"", editable: true},{value:"", editable: true},"TAX",{value:"", editable: true},{value:"", editable: true}],
          [{value:"", editable: true},{value:"", editable: true},{value:"", editable: true},{value:"", editable: true},"SERVICE CALL",{value:"", editable: true},{value:"", editable: true}],
          [{value:"", editable: true},{value:"", editable: true},{value:"", editable: true},{value:"", editable: true},"LABOR",{value:"", editable: true},{value:"", editable: true}],
          [{value:"", editable: true},{value:"", editable: true},{value:"", editable: true},{value:"", editable: true},"DEPOSIT",{value:"", editable: true},{value:"", editable: true}],
          [{value:"", editable: true},{value:"", editable: true},{value:"", editable: true},{value:"", editable: true},"PICKUP & DELIVERY",{value:"", editable: true},{value:"", editable: true}],
          [{value:"", editable: true},{value:"", editable: true},{value:"", editable: true},{value:"", editable: true},"ALL WORK COD",{value:"", editable: true},{value:"", editable: true}],
          [{value:"", editable: true},{value:"MATERIAL TOTAL"},{value:"", editable: true},{value:"", editable: true},"BALANCE DUE",{value:"", editable: true},{value:"", editable: true}],
      
        ]}
        //emptyRows={2}
        onCellChange={(value, column, row, unique_id) => {
          console.log(`Cell Change on Column: ${column} Row: ${row}
                      and unique_id: ${unique_id}`);
        }}
        onColumnChange={(value, oldVal, newVal) => {
          console.log(`Column Change. Old Value: ${oldVal} New Value: ${newVal}`)
        }}
        customStyles={{

        }}
        style={styles.table}
      />
      <Input
        style={styles.input}
        placeholder="TECHNICIAN'S REPORT"
        value={report}
        onChangeText={(text) => setReport(text)}
      />

      <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />

    </SafeAreaView>
  );
    
}
  
   
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  table: {
    flex: 1,
    marginBottom: 30
  },
  image: {
    width: 300,
    height: 50,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 450,
    borderColor: "grey",
  },
});

export default EditableInvoice