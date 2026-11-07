export default function Checks({ items, all }) {
  return (
    <ul className="checks">
      {(all ? items : items.slice(0, 3)).map((c) => (
        <li key={c.t} className={c.ok ? 'ok' : 'bad'}>
          <span aria-hidden="true">{c.ok ? '✓' : '✕'}</span>
          <span>
            <span className="sr">{c.ok ? 'You meet: ' : 'You do not meet: '}</span>{c.t}
            {!c.ok && all && c.fix && <em className="mute"> · {c.fix}</em>}
          </span>
        </li>
      ))}
    </ul>
  )
}
