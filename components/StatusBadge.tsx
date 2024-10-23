import clsx from "clsx"

const StatusBadge = ({status}:{status:Status}) => {
  return (
    <div className={clsx('status-badge', {
      'bg-green-600': status === 'scheduled',
      'bg-blue-600':status === 'pending',
      'bg-red-600':status=== 'cancelled'
    })}>
      StatusBadge
    </div>
  )
}

export default StatusBadge