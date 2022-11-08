import * as Yup from 'yup';
import Images from './Images';

const resume = Yup.object().shape({
  c_inst_name: Yup.array().of(
    Yup.object().shape({
      c_inst_name: Yup.string().required(),
    }),
  ),
  c_sub_name: Yup.array().of(
    Yup.object().shape({
      c_sub_name: Yup.string().required(),
    }),
  ),
  c_degree: Yup.array().of(
    Yup.object().shape({
      c_degree: Yup.string().required(),
    }),
  ),
  c_years: Yup.array().of(
    Yup.object().shape({
      c_s_years: Yup.date().required(),
      c_e_years: Yup.date()
        .min(
          Yup.ref('c_s_years'),
          "Education end date can't be before start date",
        )
        .required(),
    }),
  ),
});

const getTextInputStatusIcon = (
  isError = false,
  isTouched = false,
  isBlank = true,
) => {
  let icon = null;
  if (isTouched) {
    if (isError) {
      icon = Images.inputError;
    } else {
      icon = Images.inputCheck;
    }
  } else {
    if (isBlank) {
      icon = Images.uncheckbox;
    }
  }
  return icon;
};

export default {
  resume,
  getTextInputStatusIcon,
};
