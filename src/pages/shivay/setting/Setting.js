import React from 'react'
import PageTitle from '../../../helpers/PageTitle'

const Setting = () => {
  return (
    <div>
        <PageTitle
                breadCrumbItems={[
                    { label: "SHIVAY Setting", path: "/shivay/setting" },
                    { label: "Setting", path: "/shivay/setting", active: true },
                ]}
                title={"Setting"}
            />
    </div>
  )
}

export default Setting