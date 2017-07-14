import { dialog, normalize } from 'erector';

export default function* typeDialog() {
  yield normalize(dialog({
    message: 'Select creation type',
    type: 'list',
    choices: ['script', 'package'],
    default: 'script',
  }), type => ({
    type,
  }));
}
