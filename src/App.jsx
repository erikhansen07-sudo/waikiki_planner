import React, { useEffect, useMemo, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { buildSeedState, TAGS } from './seedData'

const STORAGE_KEY = 'waikiki-trip-planner:v2'

// ---------- storage ----------
const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return buildSeedState()
    const parsed = JSON.parse(raw)
    if (!parsed || !parsed.days || !parsed.stops) return buildSeedState()
    return parsed
  } catch {
    return buildSeedState()
  }
}
const saveState = (state) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch {}
}
const uid = () => 'id-' + Math.random().toString(36).slice(2, 10)

// ---------- reducer-ish helpers ----------
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}
const move = (sourceList, destList, sourceIndex, destIndex) => {
  const source = Array.from(sourceList)
  const dest = Array.from(destList)
  const [removed] = source.splice(sourceIndex, 1)
  dest.splice(destIndex, 0, removed)
  return [source, dest]
}

// ---------- UI ----------
const TAG_COLORS = {
  Beach:     { bg: '#dfeef2', fg: '#1e5f74', dot: '#4a90a4' },
  Food:      { bg: '#f7e6d5', fg: '#8a4a1e', dot: '#d1763a' },
  Adventure: { bg: '#e5ecd9', fg: '#3c5a1e', dot: '#6b8e3d' },
  Culture:   { bg: '#efe2ef', fg: '#5c2d5c', dot: '#8e5795' },
  Show:      { bg: '#f4dcd2', fg: '#7a2e1e', dot: '#c24c2f' },
  Shopping:  { bg: '#f7ead8', fg: '#7a5a1e', dot: '#c79a3a' },
  Travel:    { bg: '#dedde8', fg: '#333b63', dot: '#5560a3' },
}

const TagChip = ({ tag }) => {
  const c = TAG_COLORS[tag] || TAG_COLORS.Travel
  return (
    <span className="chip" style={{ background: c.bg, color: c.fg }}>
      <span className="chip-dot" style={{ background: c.dot }} />
      {tag}
    </span>
  )
}

const StopCard = ({ stop, onEdit, onDelete, onToggleConfirmed, dragHandleProps, isGhost }) => {
  return (
    <div className={`stop ${stop.confirmed ? 'is-confirmed' : 'is-maybe'} ${isGhost ? 'is-ghost' : ''}`}>
      <div className="stop-head">
        <div className="stop-handle" {...dragHandleProps} aria-label="Drag stop">⋮⋮</div>
        <div className="stop-title-wrap">
          {stop.time && <div className="stop-time">{stop.time}</div>}
          <h4 className="stop-title">{stop.title}</h4>
        </div>
        <div className="stop-actions">
          <button
            className={`pill ${stop.confirmed ? 'pill-on' : 'pill-off'}`}
            onClick={onToggleConfirmed}
            title={stop.confirmed ? 'Mark as maybe' : 'Mark as confirmed'}
          >
            {stop.confirmed ? 'Confirmed' : 'Maybe'}
          </button>
          <button className="icon-btn" onClick={onEdit} title="Edit">✎</button>
          <button className="icon-btn" onClick={onDelete} title="Delete">✕</button>
        </div>
      </div>
      <div className="stop-meta">
        <TagChip tag={stop.tag} />
      </div>
      {stop.notes && <p className="stop-notes">{stop.notes}</p>}
    </div>
  )
}

const StopForm = ({ initial, onSave, onCancel, title }) => {
  const [draft, setDraft] = useState({
    title: initial?.title || '',
    tag: initial?.tag || 'Beach',
    time: initial?.time || '',
    confirmed: initial?.confirmed ?? false,
    notes: initial?.notes || '',
  })
  const update = (k, v) => setDraft(d => ({ ...d, [k]: v }))
  const submit = (e) => {
    e.preventDefault()
    if (!draft.title.trim()) return
    onSave(draft)
  }
  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <h3 className="modal-title">{title}</h3>
        <label className="field">
          <span>Title</span>
          <input autoFocus value={draft.title} onChange={(e) => update('title', e.target.value)} placeholder="e.g. Sunset canoe ride" />
        </label>
        <div className="field-row">
          <label className="field">
            <span>Time</span>
            <input value={draft.time} onChange={(e) => update('time', e.target.value)} placeholder="6:30pm or Morning" />
          </label>
          <label className="field">
            <span>Tag</span>
            <select value={draft.tag} onChange={(e) => update('tag', e.target.value)}>
              {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>
        </div>
        <label className="field">
          <span>Notes</span>
          <textarea rows={3} value={draft.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Reservations, tips, reminders…" />
        </label>
        <label className="field-check">
          <input type="checkbox" checked={draft.confirmed} onChange={(e) => update('confirmed', e.target.checked)} />
          <span>Confirmed</span>
        </label>
        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  )
}

export default function App() {
  const [state, setState] = useState(loadState)
  const [editing, setEditing] = useState(null) // { mode: 'new'|'edit', dayId|'ideas', stopId? }
  const [filter, setFilter] = useState('All')

  useEffect(() => { saveState(state) }, [state])

  const tripStats = useMemo(() => {
    const all = Object.values(state.stops)
    const scheduled = state.days.reduce((a, d) => a + d.stopIds.length, 0)
    const confirmed = state.days.reduce((a, d) =>
      a + d.stopIds.filter(id => state.stops[id]?.confirmed).length, 0)
    return { total: all.length, scheduled, confirmed, ideas: state.ideas.length }
  }, [state])

  // ---------- dnd ----------
  const onDragEnd = (result) => {
    const { source, destination, type } = result
    if (!destination) return
    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    if (type === 'DAY') {
      setState(prev => ({ ...prev, days: reorder(prev.days, source.index, destination.index) }))
      return
    }

    // type === 'STOP'
    setState(prev => {
      const sameList = source.droppableId === destination.droppableId
      const getList = (id) => id === 'ideas'
        ? prev.ideas
        : prev.days.find(d => d.id === id)?.stopIds

      if (sameList) {
        const list = getList(source.droppableId)
        if (!list) return prev
        const newList = reorder(list, source.index, destination.index)
        if (source.droppableId === 'ideas') return { ...prev, ideas: newList }
        return {
          ...prev,
          days: prev.days.map(d => d.id === source.droppableId ? { ...d, stopIds: newList } : d),
        }
      }

      const srcList = getList(source.droppableId)
      const dstList = getList(destination.droppableId)
      if (!srcList || !dstList) return prev
      const [newSrc, newDst] = move(srcList, dstList, source.index, destination.index)

      let next = { ...prev }
      if (source.droppableId === 'ideas') next = { ...next, ideas: newSrc }
      else next = { ...next, days: next.days.map(d => d.id === source.droppableId ? { ...d, stopIds: newSrc } : d) }

      if (destination.droppableId === 'ideas') next = { ...next, ideas: newDst }
      else next = { ...next, days: next.days.map(d => d.id === destination.droppableId ? { ...d, stopIds: newDst } : d) }

      return next
    })
  }

  // ---------- CRUD ----------
  const openNew = (target) => setEditing({ mode: 'new', target })
  const openEdit = (target, stopId) => setEditing({ mode: 'edit', target, stopId })
  const close = () => setEditing(null)

  const saveStop = (draft) => {
    setState(prev => {
      if (editing.mode === 'edit') {
        return {
          ...prev,
          stops: { ...prev.stops, [editing.stopId]: { ...prev.stops[editing.stopId], ...draft } },
        }
      }
      const id = uid()
      const newStop = { id, ...draft }
      const next = { ...prev, stops: { ...prev.stops, [id]: newStop } }
      if (editing.target === 'ideas') {
        return { ...next, ideas: [...next.ideas, id] }
      }
      return {
        ...next,
        days: next.days.map(d => d.id === editing.target ? { ...d, stopIds: [...d.stopIds, id] } : d),
      }
    })
    close()
  }

  const deleteStop = (target, stopId) => {
    setState(prev => {
      const { [stopId]: _drop, ...restStops } = prev.stops
      return {
        ...prev,
        stops: restStops,
        ideas: prev.ideas.filter(id => id !== stopId),
        days: prev.days.map(d => ({ ...d, stopIds: d.stopIds.filter(id => id !== stopId) })),
      }
    })
  }

  const toggleConfirmed = (stopId) => {
    setState(prev => ({
      ...prev,
      stops: { ...prev.stops, [stopId]: { ...prev.stops[stopId], confirmed: !prev.stops[stopId].confirmed } },
    }))
  }

  const resetAll = () => {
    if (confirm('Reset the whole itinerary to the original plan? Your edits will be lost.')) {
      const fresh = buildSeedState()
      setState(fresh)
    }
  }

  const editingStop = editing?.mode === 'edit' ? state.stops[editing.stopId] : null

  const passesFilter = (stop) => filter === 'All' || stop.tag === filter

  return (
    <div className="app">
      <header className="masthead">
        <div className="masthead-inner">
          <div className="masthead-eyebrow">Volume 01 · The Pacific Issue</div>
          <h1 className="masthead-title">Waikīkī, <span className="masthead-italic">to the shore and back</span></h1>
          <div className="masthead-sub">
            The Hansen family · May 19 – 26, 2026 · an 8-day swim through the warm Hawaiian week
          </div>
          <div className="masthead-meta">
            <span>{tripStats.scheduled} stops scheduled</span>
            <span className="dot">·</span>
            <span>{tripStats.confirmed} confirmed</span>
            <span className="dot">·</span>
            <span>{tripStats.ideas} ideas on ice</span>
          </div>
        </div>
      </header>

      <div className="toolbar">
        <div className="toolbar-filters">
          <span className="toolbar-label">Filter</span>
          {['All', ...TAGS].map(t => (
            <button
              key={t}
              className={`tab ${filter === t ? 'tab-on' : ''}`}
              onClick={() => setFilter(t)}
            >{t}</button>
          ))}
        </div>
        <div className="toolbar-actions">
          <button className="btn btn-ghost" onClick={resetAll}>Reset to original plan</button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="layout">
          {/* Ideas bin */}
          <aside className="ideas-col">
            <div className="ideas-head">
              <div className="ideas-eyebrow">The Ideas Bin</div>
              <h2 className="ideas-title">Unscheduled · drag into a day</h2>
              <button className="btn btn-primary btn-sm" onClick={() => openNew('ideas')}>+ Add idea</button>
            </div>
            <Droppable droppableId="ideas" type="STOP">
              {(provided, snapshot) => (
                <div
                  className={`ideas-list ${snapshot.isDraggingOver ? 'is-over' : ''}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {state.ideas
                    .map(id => state.stops[id])
                    .filter(Boolean)
                    .filter(passesFilter)
                    .map((stop, index) => (
                      <Draggable key={stop.id} draggableId={stop.id} index={state.ideas.indexOf(stop.id)}>
                        {(prov, snap) => (
                          <div
                            ref={prov.innerRef}
                            {...prov.draggableProps}
                            style={prov.draggableProps.style}
                          >
                            <StopCard
                              stop={stop}
                              onEdit={() => openEdit('ideas', stop.id)}
                              onDelete={() => deleteStop('ideas', stop.id)}
                              onToggleConfirmed={() => toggleConfirmed(stop.id)}
                              dragHandleProps={prov.dragHandleProps}
                              isGhost={snap.isDragging}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                  {state.ideas.length === 0 && (
                    <div className="empty-hint">Your bin is empty. Add an idea or drop a stop from any day.</div>
                  )}
                </div>
              )}
            </Droppable>
          </aside>

          {/* Days */}
          <main className="days-col">
            <Droppable droppableId="days-root" type="DAY">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="days-list">
                  {state.days.map((day, dayIndex) => (
                    <Draggable key={day.id} draggableId={day.id} index={dayIndex}>
                      {(dayProv, daySnap) => (
                        <section
                          ref={dayProv.innerRef}
                          {...dayProv.draggableProps}
                          className={`day ${daySnap.isDragging ? 'is-ghost' : ''}`}
                        >
                          <div className="day-head">
                            <div className="day-drag" {...dayProv.dragHandleProps} aria-label="Drag day">⋮⋮</div>
                            <div className="day-titles">
                              <div className="day-eyebrow">Day {dayIndex + 1}</div>
                              <h3 className="day-title">{day.label}</h3>
                              <div className="day-sub">{day.subtitle}</div>
                            </div>
                            <button className="btn btn-primary btn-sm" onClick={() => openNew(day.id)}>
                              + Add stop
                            </button>
                          </div>

                          <Droppable droppableId={day.id} type="STOP">
                            {(stopProv, stopSnap) => (
                              <div
                                className={`stops-list ${stopSnap.isDraggingOver ? 'is-over' : ''}`}
                                ref={stopProv.innerRef}
                                {...stopProv.droppableProps}
                              >
                                {day.stopIds
                                  .map(id => state.stops[id])
                                  .filter(Boolean)
                                  .map((stop) => {
                                    const realIndex = day.stopIds.indexOf(stop.id)
                                    const visible = passesFilter(stop)
                                    return (
                                      <Draggable key={stop.id} draggableId={stop.id} index={realIndex}>
                                        {(prov, snap) => (
                                          <div
                                            ref={prov.innerRef}
                                            {...prov.draggableProps}
                                            style={{
                                              ...prov.draggableProps.style,
                                              display: visible ? undefined : 'none',
                                            }}
                                          >
                                            <StopCard
                                              stop={stop}
                                              onEdit={() => openEdit(day.id, stop.id)}
                                              onDelete={() => deleteStop(day.id, stop.id)}
                                              onToggleConfirmed={() => toggleConfirmed(stop.id)}
                                              dragHandleProps={prov.dragHandleProps}
                                              isGhost={snap.isDragging}
                                            />
                                          </div>
                                        )}
                                      </Draggable>
                                    )
                                  })}
                                {stopProv.placeholder}
                                {day.stopIds.length === 0 && (
                                  <div className="empty-hint">No stops yet. Drag one in, or add a new one.</div>
                                )}
                              </div>
                            )}
                          </Droppable>
                        </section>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </main>
        </div>
      </DragDropContext>

      <footer className="footer">
        <span>Saved locally in this browser · </span>
        <span className="footer-soft">aloha, and safe travels.</span>
      </footer>

      {editing && (
        <StopForm
          title={editing.mode === 'edit' ? 'Edit stop' : 'New stop'}
          initial={editingStop}
          onSave={saveStop}
          onCancel={close}
        />
      )}
    </div>
  )
}
