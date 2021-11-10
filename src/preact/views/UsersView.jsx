import {useState} from 'react';
import Dropdown from '../components/Dropdown';

export default function UsersView() {
  const [value, setValue] = useState('Viewer');

  return (
      <table className="table min-w-min w-9/12 mx-auto table-fixed">
        <thead>
        <tr>
          <th className="w-3/12">Name</th>
          <th className="w-7/12">Role</th>
          <th className="w-2/12"></th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <div className="font-bold">Hart Hagerty</div>
            <div className="text-sm opacity-50">HartH@danhotels.com</div>
          </td>
          <td>
            <Dropdown
                onSelect={setValue}
                placeholder='Please select a role'
                options={[
                  {
                    value: 'Viewer',
                    name: 'Viewer',
                    description: 'Can view content only. No editing. asdf asdf asd asdf',
                  },
                  {
                    value: 'Manager',
                    name: 'Manager',
                    description: 'Can add users. Editing.',
                  },
                  {
                    value: 'Developer',
                    name: 'Developer',
                    description: 'Can edit stuff. No adding users.',
                  },
                ]}
                value={value}
            />
          </td>
          <td>
            <button className="btn btn-ghost btn-xs">remove</button>
          </td>
        </tr>
        <tr>
          <td>
            <div className="font-bold">Brice Swyre</div>
            <div className="text-sm opacity-50">BriceS@danhotels.com</div>
          </td>
          <td>
            <Dropdown
                onSelect={() => {}}
                placeholder='Please select a role'
                options={[
                  {
                    value: 'Viewer',
                    name: 'Viewer',
                    description: 'Can view content only. No editing.',
                  },
                  {
                    value: 'Manager',
                    name: 'Manager',
                    description: 'Can add users. Editing.',
                  },
                  {
                    value: 'Developer',
                    name: 'Developer',
                    description: 'Can edit stuff. No adding users.',
                  },
                ]}
                value={'Viewer'}
            />
          </td>
          <td>
            <button className="btn btn-ghost btn-xs">remove</button>
          </td>
        </tr>
        <tr>
          <td>
            <div className="font-bold">Marjy Ferencz</div>
            <div className="text-sm opacity-50">MarjyF@danhotels.com</div>
          </td>
          <td>
            <Dropdown
                onSelect={() => {}}
                placeholder='Please select a role'
                options={[
                  {
                    value: 'Viewer',
                    name: 'Viewer',
                    description: 'Can view content only. No editing.',
                  },
                  {
                    value: 'Manager',
                    name: 'Manager',
                    description: 'Can add users. Editing.',
                  },
                  {
                    value: 'Developer',
                    name: 'Developer',
                    description: 'Can edit stuff. No adding users.',
                  },
                ]}
                value={'Manager'}
            />
          </td>
          <td>
            <button className="btn btn-ghost btn-xs">remove</button>
          </td>
        </tr>
        <tr>
          <td>
            <div className="font-bold">Yancy Tear</div>
            <div className="text-sm opacity-50">YancyT@danhotels.com</div>
          </td>
          <td>
            <Dropdown
                onSelect={() => {}}
                placeholder='Please select a role'
                options={[
                  {
                    value: 'Viewer',
                    name: 'Viewer',
                    description: 'Can view content only. No editing.',
                  },
                  {
                    value: 'Manager',
                    name: 'Manager',
                    description: 'Can add users. Editing.',
                  },
                  {
                    value: 'Developer',
                    name: 'Developer',
                    description: 'Can edit stuff. No adding users.',
                  },
                ]}
                value={'Developer'}
            />
          </td>
          <td>
            <button className="btn btn-ghost btn-xs">remove</button>
          </td>
        </tr>
        </tbody>
      </table>
  );
}