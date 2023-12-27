import { DeepRequired } from '../utils/template-driven.forms';

export type PhonenumberModel = Partial<{
  addValue: string;
  values: Record<string, string>;
}>;

export const phonenumberShape: DeepRequired<PhonenumberModel> = {
  addValue: '',
  values: {
    '0': '',
  },
};
