import React, {useEffect} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import styles from './styles';
import {gql, useMutation} from '@apollo/client';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RouteParams} from './types';

const JobsData = gql`
  mutation addPostJob(
    $title: String!
    $commitmentId: ID!
    $companyName: String!
    $locationNames: String!
    $userEmail: String!
    $description: String!
    $applyUrl: String!
  ) {
    postJob(
      input: {
        title: $title
        commitmentId: $commitmentId
        companyName: $companyName
        locationNames: $locationNames
        userEmail: $userEmail
        description: $description
        applyUrl: $applyUrl
      }
    ) {
      title
      slug
      commitment {
        id
        title
      }
      userEmail
      locationNames
      description
      applyUrl
    }
  }
`;

const DetailsScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'jobDetails'>>();
  const [addPostJob, {data, loading}] = useMutation(JobsData);
  const postJob = data?.postJob ?? {};
  const jobDetails = route.params?.jobDetails;

  useEffect(() => {
    const jobData = jobDetails ?? {};
    addPostJob({
      variables: {
        title: jobData?.title ?? '',
        commitmentId: jobData?.commitment?.id ?? '',
        locationNames: jobData?.locationNames ?? '',
        userEmail: jobData?.userEmail ?? '',
        companyName: jobData?.company?.name ?? '',
        description: jobData?.description ?? '',
        applyUrl: jobData?.applyUrl ?? '',
      },
    });
  }, [addPostJob, jobDetails]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.itemContainer}>
            <Text>{postJob?.title}</Text>
            <Text>{postJob?.slug}</Text>
            <Text>{postJob?.commitment?.title}</Text>
            <Text>{postJob?.userEmail}</Text>
            <Text>{postJob?.locationNames}</Text>
            <Text>{postJob?.description}</Text>
            <Text>{postJob?.applyUrl}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;
