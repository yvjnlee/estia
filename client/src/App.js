import './index.css'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const url = process.env.REACT_APP_SUPABASE_PROJECT_URL;
const key = process.env.REACT_APP_SUPABASE_API_KEY;

const supabase = createClient(url, key)

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (
      <>
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </>
    )
  }
  else {
    return (
      <>
        <div>
          Logged in!
        </div>

        <button
          onClick={async () => {
            await supabase.auth.signOut()
          }
        }
        >
          log out
        </button>
      </>
    )
  }
}