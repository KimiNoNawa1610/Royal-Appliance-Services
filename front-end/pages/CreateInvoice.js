import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

const source = {
    html: ``
  };

  
const CreateInvoice = () => {

    const { width } = useWindowDimensions();

    return (
        <RenderHtml contentWidth={width} source={source}/>
    )
}

export default CreateInvoice