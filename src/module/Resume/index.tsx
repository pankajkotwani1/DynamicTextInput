//import liraries
import {Formik} from 'formik';
import moment from 'moment';
import React, {Fragment, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styled from 'styled-components';
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';
import Validation from '../../utils/Validations';
import {FormikValuesProp} from './types';

// create a component
const Resume = () => {
  //note: in place of blank array can defined array from api
  const coachCertifications: FormikValuesProp[] | any[] = [];

  const [certData, setCertData] = useState(
    coachCertifications.length > 0 ? coachCertifications : [1],
  );

  //Cerification
  const [
    certification_start_years_picker,
    setCertification_Start_Year_Enabled,
  ] = useState<boolean[]>([]);
  const [certification_end_years_picker, setCertification_End_Year_Enabled] =
    useState<boolean[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * push new certification item in the array
   */
  const pushCertData = () => {
    certData.push(certData?.length + 1);
    setCertData([...certData]);
  };

  /**
   * pop certification item from the array
   */
  const popCertData = () => {
    certData.pop();
    setCertData([...certData]);
  };

  /**
   * UpdateResume here we have rearranged the submitted data
   */
  const UpdateResume = values => {
    let cerification = [];
    for (let i = 0; i < certData.length; i++) {
      cerification[i] = {
        institution_name:
          values?.c_inst_name[i]?.c_inst_name !== ''
            ? values.c_inst_name[i].c_inst_name
            : '',
        subject_or_skill_name: values?.c_sub_name[i]?.c_sub_name
          ? values.c_sub_name[i].c_sub_name
          : '',
        degree_of_grade:
          values?.c_degree[i]?.c_degree !== ''
            ? values.c_degree[i].c_degree
            : '',
        year_start:
          values?.c_years[i]?.c_s_years !== ''
            ? moment(values?.c_years[i]?.c_s_years).format('YYYY-MM-DD')
            : '',
        year_end:
          values?.c_years[i]?.c_e_years !== ''
            ? moment(values?.c_years[i]?.c_e_years).format('YYYY-MM-DD')
            : '',
      };
    }
    console.log('UPDATED CERTIFICATION DATA', cerification);
  };

  /**
   * onCertification_Start date helps enabling date picker modal for start year
   */
  const onCertification_Start = (indexToChange: number, isOpen: boolean) => {
    certification_start_years_picker[indexToChange] = isOpen;
    setCertification_Start_Year_Enabled([...certification_start_years_picker]);
  };

  /**
   * onCertification_End helps enabling date picker modal for end year
   */
  const onCertification_End = (indexToChange: number, isOpen: boolean) => {
    certification_end_years_picker[indexToChange] = isOpen;
    setCertification_End_Year_Enabled([...certification_end_years_picker]);
  };

  /**
   * onModalEvent helps enabling degree modal
   */
  const onModalEvent = (indexToChange: number, isOpen: boolean) => {
    modalVisible[indexToChange] = isOpen;
    setModalVisible([...modalVisible]);
  };

  const getDateValue = (date: any) => {
    if (date === '') {
      return <YearText>Start Date</YearText>;
    } else {
      return <StatusText> {moment(date).format('MM/DD/YYYY')}</StatusText>;
    }
  };

  return (
    <Container>
      <SubContainer>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Formik
            key={'resume'}
            initialValues={{
              c_inst_name:
                certData.length > 0
                  ? certData?.map(e => {
                      return {c_inst_name: e.c_inst_name};
                    })
                  : [{c_inst_name: ''}],
              c_sub_name:
                certData.length > 0
                  ? certData?.map(e => {
                      return {c_sub_name: e.c_sub_name};
                    })
                  : [{c_sub_name: ''}],
              c_degree:
                certData.length > 0
                  ? certData.map(e => {
                      return {c_degree: e.c_degree};
                    })
                  : [{c_degree: ''}],
              c_years:
                certData.length > 0
                  ? certData.map((e, i) => {
                      return {
                        c_s_years: e?.c_years?.[i]?.c_s_years ?? '',
                        c_e_years: e?.c_years?.[i]?.c_e_years ?? '',
                      };
                    })
                  : [{c_s_years: '', c_e_years: ''}],
              data: [
                {label: 'High School', isSelect: false},
                {label: 'Associate Degree', isSelect: false},
                {label: 'Bachelor’s Degree', isSelect: false},
                {label: 'Master’s Degree or Higher', isSelect: false},
              ],
              selectId:
                certData.length > 0
                  ? certData.map(e => {
                      return {degree_of_grade: e.degree_of_grade};
                    })
                  : [{degree_of_grade: ''}],
            }}
            validationSchema={Validation.resume}
            enableReinitialize={true}
            validateOnChange={true}
            onSubmit={values => {
              console.log('VALUES', values);
              UpdateResume(values);
            }}>
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
              handleBlur,
            }) => (
              <>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {certData.map((e, i) => {
                    return (
                      <Fragment key={i}>
                        <HeaderContainer>
                          <HeaderText>Certifications {i + 1}</HeaderText>
                          {certData.length > 1 ? (
                            certData.length - 1 === i ? (
                              <Pressable onPress={popCertData}>
                                <Closeimg source={Images.close} />
                              </Pressable>
                            ) : null
                          ) : null}
                        </HeaderContainer>
                        <TextInputLabel>Institution Name</TextInputLabel>
                        <TextInputView>
                          <TextInput
                            placeholderTextColor={Colors.primarylg}
                            placeholder={'Input Caption'}
                            onChangeText={handleChange(
                              `c_inst_name[${i}].c_inst_name`,
                            )}
                            onBlur={handleBlur(`c_inst_name[${i}].c_inst_name`)}
                            value={
                              values.c_inst_name?.[i] !== undefined
                                ? values.c_inst_name[i].c_inst_name
                                : ''
                            }
                            keyboardType="default"
                            returnKeyType="next"
                          />
                          <Img
                            source={Validation.getTextInputStatusIcon(
                              errors?.c_inst_name?.[i],
                              touched?.c_inst_name?.[i] ||
                                values?.c_inst_name[i]?.c_inst_name,
                              values?.c_inst_name[i]?.c_inst_name !==
                                undefined &&
                                values?.c_inst_name[i]?.c_inst_name !== ''
                                ? false
                                : true,
                            )}
                          />
                        </TextInputView>
                        <TextInputLabel>Subject or Skill Name</TextInputLabel>
                        <TextInputView>
                          <TextInput
                            placeholderTextColor={Colors.primarylg}
                            placeholder="Input Caption"
                            onChangeText={handleChange(
                              `c_sub_name[${i}].c_sub_name`,
                            )}
                            onBlur={handleBlur(`c_sub_name[${i}].c_sub_name`)}
                            value={
                              values.c_sub_name?.[i] !== undefined
                                ? values.c_sub_name[i].c_sub_name
                                : ''
                            }
                            keyboardType="default"
                            returnKeyType="next"
                          />
                          <Img
                            source={Validation.getTextInputStatusIcon(
                              errors?.c_sub_name?.[i],
                              touched?.c_sub_name?.[i] ||
                                values?.c_sub_name[i]?.c_sub_name,
                              values?.c_sub_name[i]?.c_sub_name !== undefined &&
                                values?.c_sub_name[i]?.c_sub_name !== ''
                                ? false
                                : true,
                            )}
                          />
                        </TextInputView>
                        <TextInputLabel>Years</TextInputLabel>
                        <TextInputView>
                          <YearsView>
                            <YearTextInput
                              onPress={() => onCertification_Start(i, true)}>
                              {values?.c_years?.[i] !== undefined ? (
                                getDateValue(values?.c_years?.[i]?.c_s_years)
                              ) : (
                                <YearText>Start Date</YearText>
                              )}
                              <Separator />
                            </YearTextInput>

                            <YearTextInput
                              onPress={() => onCertification_End(i, true)}>
                              {values?.c_years?.[i] !== undefined ? (
                                getDateValue(values?.c_years?.[i]?.c_e_years)
                              ) : (
                                <YearText>End Date</YearText>
                              )}
                              <Separator />
                            </YearTextInput>
                          </YearsView>
                          <Img
                            source={Validation.getTextInputStatusIcon(
                              errors?.c_years?.[i],
                              touched?.c_years?.[i] ||
                                values?.c_years[i]?.c_e_years,
                              values?.c_years[i]?.c_e_years !== undefined &&
                                values?.c_years[i]?.c_e_years !== ''
                                ? false
                                : true,
                            )}
                          />
                          <DateTimePickerModal
                            isVisible={certification_start_years_picker[i]}
                            date={new Date()}
                            mode={'date'}
                            display="spinner"
                            onConfirm={date => {
                              onCertification_Start(i, false);
                              setFieldValue(
                                `c_years[${i}].c_s_years`,
                                date,
                                true,
                              );
                            }}
                            onCancel={() => onCertification_Start(i, false)}
                            maximumDate={new Date()}
                          />
                          <DateTimePickerModal
                            isVisible={certification_end_years_picker[i]}
                            date={new Date()}
                            mode={'date'}
                            display="spinner"
                            onConfirm={date => {
                              onCertification_End(i, false);
                              setFieldValue(
                                `c_years[${i}].c_e_years`,
                                date,
                                true,
                              );
                            }}
                            onCancel={() => onCertification_End(i, false)}
                            maximumDate={new Date()}
                          />
                        </TextInputView>
                        <TextInputLabel>Degree</TextInputLabel>
                        <TextInputModal onPress={() => onModalEvent(i, true)}>
                          <DropDownTextInput>
                            <DegreeText>
                              {values.c_degree?.[i]?.c_degree !== undefined &&
                              values.c_degree?.[i]?.c_degree !== ''
                                ? values?.c_degree[i]?.c_degree
                                : 'Please select from the list'}
                            </DegreeText>
                          </DropDownTextInput>
                          <Img
                            source={Validation.getTextInputStatusIcon(
                              errors?.c_degree?.[i],
                              touched?.c_degree?.[i] ||
                                values?.c_degree[i]?.c_degree,
                              values?.c_degree?.[i]?.c_degree !== undefined &&
                                values?.c_degree?.[i]?.c_degree !== ''
                                ? false
                                : true,
                            )}
                          />
                        </TextInputModal>

                        {modalVisible[i] && (
                          <Modal
                            isVisible={modalVisible[i]}
                            animationInTiming={500}
                            animationOutTiming={1000}
                            backdropTransitionInTiming={500}
                            backdropTransitionOutTiming={1000}
                            onBackdropPress={() => onModalEvent(i, false)}
                            onBackButtonPress={() => onModalEvent(i, false)}
                            style={{
                              justifyContent: 'flex-end',
                              margin: 0,
                            }}>
                            <ModalView>
                              <ModalHeaderView>
                                <ModalHeaderText>
                                  Educational Level
                                </ModalHeaderText>
                                <TouchableOpacity
                                  onPress={() => onModalEvent(i, false)}>
                                  <DownImg source={Images.close} />
                                </TouchableOpacity>
                              </ModalHeaderView>
                              <FlatList
                                data={values.data}
                                keyExtractor={(item, index) => String(index)}
                                renderItem={({item, index}) => {
                                  return (
                                    <ModalTouchable
                                      onPress={() => {
                                        setFieldValue(
                                          `selectId[${i}].degree_of_grade`,
                                          item.label,
                                          true,
                                        );
                                        setFieldValue(
                                          `c_degree[${i}].c_degree`,
                                          item.label,
                                          true,
                                        );
                                      }}>
                                      <DegreeItem>
                                        <RenderText>{item.label}</RenderText>
                                        <Seperator />
                                      </DegreeItem>
                                      <Img
                                        source={
                                          item.label ===
                                          values?.selectId[i]?.degree_of_grade
                                            ? Images.inputCheck
                                            : Images.uncheckbox
                                        }
                                      />
                                    </ModalTouchable>
                                  );
                                }}
                                showsVerticalScrollIndicator={false}
                                extraData={values.selectId}
                              />
                              <Done onPress={() => onModalEvent(i, false)}>
                                <DoneText>Done</DoneText>
                              </Done>
                            </ModalView>
                          </Modal>
                        )}
                      </Fragment>
                    );
                  })}
                  <AddView onPress={() => pushCertData()}>
                    <TextLabel>Add Another Certifications</TextLabel>
                    <Addnew source={Images.add} />
                  </AddView>
                </ScrollView>
                <Save disabled={loading} onPress={handleSubmit}>
                  {!loading ? (
                    <SaveText>Save</SaveText>
                  ) : (
                    <ActivityIndicator size="large" color={Colors.primarylp1} />
                  )}
                </Save>
              </>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </SubContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background: ${Colors.white};
`;
const SubContainer = styled.View`
  height: 85%;
  width: 100%;
`;
const Separator = styled.View`
  border-color: ${Colors.primarylg};
  border-bottom-width: 0.5px;
  padding-vertical: 3px;
`;
const HeaderContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-horizontal: 20px;
  margin-top: 20px;
`;
const HeaderText = styled.Text`
  font-size: 20px;
  color: ${Colors.primaryP};
`;
const TextInputView = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: flex-end;
  margin-horizontal: 20px;
`;
const TextInputModal = styled.TouchableOpacity`
  justify-content: space-between;
  flex-direction: row;
  align-items: flex-end;
  height: 35px;
  margin-horizontal: 20px;
`;
const DropDownTextInput = styled.View`
  border-bottom-width: 0.5px;
  border-color: ${Colors.primarylg};
  width: 84%;
`;
const DegreeText = styled.Text`
  font-size: 14px;
  color: ${Colors.primarylg};
  margin-bottom: 8px;
  padding-left: 10px;
`;
const YearsView = styled.View`
  justify-content: space-between;
  flex-direction: row;
  width: 85%;
`;
const AddView = styled.TouchableOpacity`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 20px;
  margin-horizontal: 20px;
`;

const TextInputLabel = styled.Text`
  font-size: 14px;
  color: ${Colors.label};
  margin-top: 15px;
  margin-left: 20px;
  font-weight: bold;
`;
const TextLabel = styled.Text`
  font-size: 14px;
`;

const TextInput = styled.TextInput`
  height: 35px;
  font-size: 14px;
  border-bottom-width: 0.5px;
  border-color: ${Colors.primarylg};
  padding-left: 10px;
  width: 84%;
  padding-vertical: 0px;
`;

const StatusText = styled.Text`
  font-size: 14px;
  padding-left: 5px;
`;

const YearText = styled.Text`
  font-size: 14px;
  color: ${Colors.primarylg};
  padding-left: 10px;
`;
const YearTextInput = styled.TouchableOpacity`
  width: 32%;
`;

const Img = styled.Image`
  width: 34px;
  height: 34px;
  resize-mode: contain;
`;

const Closeimg = styled.Image`
  width: 15px;
  height: 15px;
  resizemode: contain;
  tint-color: ${Colors.primaryP};
`;

const Addnew = styled.Image`
  width: 30px;
  height: 30px;
  resizemode: contain;
  tint-color: ${Colors.primaryP};
`;

const ModalView = styled.View`
  height: 50%;
  width: 100%;
  background-color: ${Colors.white};
  align-self: center;
  padding-bottom: 10px;
  padding-horizontal: 15px;
`;
const ModalHeaderText = styled.Text`
  font-size: 18px;
  color: ${Colors.primaryP};
`;
const DownImg = styled.Image`
  height: 18px;
  width: 18px;
  resize-mode: contain;
`;
const ModalHeaderView = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-vertical: 15px;
`;

const ModalTouchable = styled.TouchableOpacity`
  margin-top: 15px;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const DegreeItem = styled.View`
  width: 90%;
`;
const RenderText = styled.Text`
  font-size: 14px;
  color: ${Colors.primarylg};
  font-weight: 600;
  padding-left: 10px;
`;
const Seperator = styled.View`
  height: 1px;
  width: 90%;
  background: ${Colors.separator1};
  margin-top: 5px;
`;
const Save = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${Colors.primaryP};
  margin-vertical: 20px;
  height: 50px;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-radius: 20px;
  width: 90%;
`;
const SaveText = styled.Text`
  color: ${Colors.primaryP};
  font-size: 18px;
`;
const Done = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${Colors.primaryP};
  margin-top: 35px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 100%;
`;
const DoneText = styled.Text`
  color: ${Colors.primaryP};
  font-size: 18px;
`;
//make this component available to the app
export default Resume;
