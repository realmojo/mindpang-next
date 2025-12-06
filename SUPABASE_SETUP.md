# Supabase 설정 가이드

## 1. 환경 변수 설정

`.env.local` 파일에 다음 변수들을 추가하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

이 값들은 Supabase 프로젝트 설정에서 확인할 수 있습니다:
https://app.supabase.com/project/_/settings/api

## 2. Supabase 클라이언트 사용

### 클라이언트 컴포넌트에서 사용

```typescript
import { supabase } from '@/lib/supabase'

// 데이터 조회
const { data, error } = await supabase
  .from('table_name')
  .select('*')

// 데이터 삽입
const { data, error } = await supabase
  .from('table_name')
  .insert({ column: 'value' })

// 데이터 업데이트
const { data, error } = await supabase
  .from('table_name')
  .update({ column: 'new_value' })
  .eq('id', id)

// 데이터 삭제
const { error } = await supabase
  .from('table_name')
  .delete()
  .eq('id', id)
```

### 서버 컴포넌트나 API 라우트에서 사용

```typescript
import { createServerClient } from '@/lib/supabase'

const supabase = createServerClient()
const { data, error } = await supabase.from('table_name').select('*')
```

## 3. 타입 생성

Supabase CLI를 사용하여 데이터베이스 타입을 자동 생성할 수 있습니다:

```bash
# Supabase CLI 설치
npm install -g supabase

# 타입 생성 (로컬 개발)
supabase gen types typescript --local > lib/supabase-types.ts

# 타입 생성 (프로덕션)
supabase gen types typescript --project-id <project-id> > lib/supabase-types.ts
```

## 4. 인증 사용 (선택사항)

```typescript
import { supabase } from '@/lib/supabase'

// 로그인
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
})

// 회원가입
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password'
})

// 로그아웃
await supabase.auth.signOut()

// 현재 사용자 확인
const { data: { user } } = await supabase.auth.getUser()
```

