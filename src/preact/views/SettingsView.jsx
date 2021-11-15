export default function Settings() {
  return (
    <div className="container px-4">
      <div className="min-w-min w-9/12 mx-auto">
        <div className="mt-2 text-xl font-bold">
          Change password
        </div>
        <div className="divider" />
        <div className="min-w-min w-5/12 mr-auto space-y-6">
          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Old password</span>
              </label>
              <input
                placeholder="Please enter your old password"
                className="input input-bordered input-primary"
                type="password"
              />
              <label className="label">
                <span className="label-text-alt">
                  &nbsp;
                </span>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">New password</span>
              </label>
              <input
                placeholder="Please enter your new password"
                className="input input-bordered input-primary"
                type="password"
              />
              <label className="label">
                <span className="label-text-alt">
                  &nbsp;
                </span>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm new password</span>
              </label>
              <input
                placeholder="Please confirm your new password"
                className="input input-bordered input-primary"
                type="password"
              />
              <label className="label">
                <span className="label-text-alt">
                  &nbsp;
                </span>
              </label>
            </div>
          </div>
          <div className="form-control w-1/2">
            <button
              type="button"
              className="btn btn-primary"
            >
              Update password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
