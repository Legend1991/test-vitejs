import { RefreshIcon } from '@heroicons/react/outline';

import Dropdown from '../components/Dropdown';
import InviteInput from '../components/InviteInput';
import usePresenter from '../usePresenter';

export default function UsersView(props) {
  const { controller, model } = usePresenter(props);

  return (
    <div className="container mx-auto px-4 space-y-6">
      <div className="min-w-min w-9/12 mx-auto">
        <InviteInput
          className="min-w-min w-5/12 mr-auto"
          onInvite={(v) => console.log('[UsersView.onInvite] value:', v)}
        />
      </div>
      <table className="table min-w-min w-9/12 mx-auto table-fixed">
        <thead>
          <tr>
            <th className="w-3/12">Name</th>
            <th className="w-7/12">Role</th>
            <th className="w-2/12" />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="font-bold">Hart Hagerty</div>
              <div className="text-sm opacity-50">HartH@example.com</div>
            </td>
            <td>
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
            </td>
            <td>
              <button type="button" className="btn btn-ghost btn-xs loading">
                remove
              </button>
            </td>
          </tr>
          <tr>
            <td className="flex flex-row justify-between">
              {/* <div className="font-bold">Brice Swyre</div> */}
              <div>
                <div className="badge badge-error mb-1">
                  expired
                </div>
                <div className="text-sm opacity-50">BriceS@example.com</div>
              </div>
              <div
                data-tip="Resend Invite"
                className="tooltip tooltip-error"
              >
                <button
                  type="button"
                  className="btn btn-outline btn-error btn-square"
                >
                  <RefreshIcon className="w-6 h-6" />
                </button>
              </div>
            </td>
            <td>
              <Dropdown
                onSelect={() => {}}
                placeholder="Please select a role"
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
                value="Viewer"
              />
            </td>
            <td>
              <button type="button" className="btn btn-ghost btn-xs">
                remove
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <div className="font-bold">Marjy Ferencz</div>
              <div className="text-sm opacity-50">MarjyF@example.com</div>
            </td>
            <td>
              <Dropdown
                onSelect={() => {}}
                placeholder="Please select a role"
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
                value="Manager"
              />
            </td>
            <td>
              <button type="button" className="btn btn-ghost btn-xs">
                remove
              </button>
            </td>
          </tr>
          <tr>
            <td>
              {/* <div className="font-bold">Yancy Tear</div> */}
              <div className="badge badge-info mb-1">
                invited
              </div>
              <div className="text-sm opacity-50">YancyT@example.com</div>
            </td>
            <td>
              <Dropdown
                onSelect={() => {}}
                placeholder="Please select a role"
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
                value="Developer"
              />
            </td>
            <td>
              <button type="button" className="btn btn-ghost btn-xs">
                remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
