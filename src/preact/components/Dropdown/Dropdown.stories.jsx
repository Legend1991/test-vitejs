import * as React from 'preact';
import Dropdown from './index';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
};

export function Primary() {
  return (
    <Dropdown
      onSelect={() => {}}
      placeholder="Please select a role"
      options={[
        {
          value: 'Viewer',
          name: 'Viewer',
          description: 'View content only. No editing. asdf asdf asd',
        },
        {
          value: 'Manager',
          name: 'Manager',
          description: 'Add users. Editing.',
        },
        {
          value: 'Developer',
          name: 'Developer',
          description: 'Edit stuff. No adding users.',
        },
      ]}
      value="Viewer"
    />
  );
}
