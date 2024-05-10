import React from 'react';
import { Button, View, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const FileUploader = ({setFileUri}) => {
    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        var uri=(result.assets[0].uri)
        setFileUri(uri);
        console.log(uri)
        console.log(result.assets[0])
    };
    return (
        <View>
            <Button title="Pick a document" onPress={pickDocument} />
        </View>
    );
};

export default FileUploader;
