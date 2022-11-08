import React from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import styles from './styles';
import {gql, useQuery} from '@apollo/client';
import {IJobItemProps} from './types';
import {useNavigation} from '@react-navigation/native';

const JobsData = gql`
  query {
    jobs {
      id
      slug
      title
      commitment {
        id
        title
      }
      userEmail
      locationNames
      description
      applyUrl
      company {
        id
        name
      }
    }
  }
`;

const HomeScreen = () => {
  const {data, loading} = useQuery(JobsData);
  const navigation = useNavigation();
  // console.log('data', data);

  const JobItem = ({item}: {item: Partial<IJobItemProps>}) => (
    <View style={styles.itemContainer}>
      <Pressable
        onPress={() => navigation.navigate('Details', {jobDetails: item})}>
        <Text>{item.id}</Text>
        <Text>{item.slug}</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={data?.jobs} renderItem={JobItem} />
    </View>
  );
};

export default HomeScreen;
