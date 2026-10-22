{-# OPTIONS --safe --guardedness --no-postfix-projections --exact-split #-}

module ZH1ProbaMegoldas where

open import Lib

-- Σ 35 pont — PRÓBA-ZH, MEGOLDÁSOK

----------------------
-- 1. FELADAT (3 pont)
----------------------
-- ⊥ ⊎ A × ⊤ → B ⊎ B × ⊥   =   (⊥ ⊎ (A × ⊤)) → (B ⊎ (B × ⊥))
-- A → B
weirdEquiv₁ : {A B : Set} → (⊥ ⊎ A × ⊤ → B ⊎ B × ⊥) ↔ (A → B)
weirdEquiv₁ {A} {B} = to , from where
  getB : B ⊎ B × ⊥ → B
  getB (inl b) = b
  getB (inr (_ , ()))
  to : (⊥ ⊎ A × ⊤ → B ⊎ B × ⊥) → (A → B)
  to f a = getB (f (inr (a , tt)))
  from : (A → B) → (⊥ ⊎ A × ⊤ → B ⊎ B × ⊥)
  from g (inr (a , tt)) = inl (g a)

----------------------
-- 2. FELADAT (4 pont)
----------------------
weirdEquiv₂ : Maybe Bool × Bool ↔ Bool ⊎ Bool × Bool
weirdEquiv₂ = to , from where
  to : Maybe Bool × Bool → Bool ⊎ Bool × Bool
  to (nothing , b) = inl b
  to (just a , b)  = inr (a , b)
  from : Bool ⊎ Bool × Bool → Maybe Bool × Bool
  from (inl b) = nothing , b
  from (inr (a , b)) = just a , b

module Feladat-2-Tesztek where
  f = fst weirdEquiv₂
  g = snd weirdEquiv₂
  _ : g (f (nothing , true)) ≡ (nothing , true)
  _ = refl
  _ : g (f (nothing , false)) ≡ (nothing , false)
  _ = refl
  _ : g (f (just true , false)) ≡ (just true , false)
  _ = refl
  _ : g (f (just false , true)) ≡ (just false , true)
  _ = refl
  _ : f (g (inl true)) ≡ inl true
  _ = refl
  _ : f (g (inr (false , true))) ≡ inr (false , true)
  _ = refl
  _ : f (g (inr (true , true))) ≡ inr (true , true)
  _ = refl

----------------------------
-- 3. FELADAT (0.5 + 4 pont)
----------------------------
-- tri n = 0 + 1 + ... + n, CSAK rec-ℕ-kel (rec-ℕ : ℕ → A → (ℕ → A → A) → A)
tri : ℕ → ℕ
tri n = rec-ℕ n 0 (λ k acc → suc k + acc)

-- b) div3 = ⌊n/3⌋ csak mintaillesztéssel és rekurzióval
div3 : ℕ → ℕ
div3 zero = zero
div3 (suc zero) = zero
div3 (suc (suc zero)) = zero
div3 (suc (suc (suc n))) = suc (div3 n)

module Feladat-3-Tesztek where
  _ : tri 0 ≡ 0
  _ = refl
  _ : tri 1 ≡ 1
  _ = refl
  _ : tri 4 ≡ 10
  _ = refl
  _ : tri 10 ≡ 55
  _ = refl
  _ : div3 0 ≡ 0
  _ = refl
  _ : div3 2 ≡ 0
  _ = refl
  _ : div3 3 ≡ 1
  _ = refl
  _ : div3 20 ≡ 6
  _ = refl

--------------------------
-- 4. FELADAT (1 + 4 pont)
--------------------------
runLength : {A : Set} → ⦃ Eq A ⦄ → List A → List (A × ℕ)
runLength [] = []
runLength (x ∷ xs) with runLength xs
... | [] = (x , 1) ∷ []
... | (y , n) ∷ rest = if x == y then (y , suc n) ∷ rest else (x , 1) ∷ (y , n) ∷ rest

module Feladat-4-Tesztek where
  _ : runLength {ℕ} [] ≡ []
  _ = refl
  _ : runLength {ℕ} (7 ∷ []) ≡ (7 , 1) ∷ []
  _ = refl
  _ : runLength {ℕ} (1 ∷ 1 ∷ 2 ∷ 3 ∷ 3 ∷ 3 ∷ 1 ∷ []) ≡ (1 , 2) ∷ (2 , 1) ∷ (3 , 3) ∷ (1 , 1) ∷ []
  _ = refl
  _ : runLength (true ∷ true ∷ false ∷ []) ≡ (true , 2) ∷ (false , 1) ∷ []
  _ = refl

-------------------------
-- 5. a) FELADAT (2 pont)
-------------------------
data Expr : Set where
  lit     : ℕ → Expr
  _:+_    : Expr → Expr → Expr
  _:*_    : Expr → Expr → Expr
  ifZero  : Expr → Expr → Expr → Expr
infixl 6 _:+_
infixl 7 _:*_

-----------------------------
-- 5. b) FELADAT (1 + 3.5 pont)
-----------------------------
eval : Expr → ℕ
eval (lit n) = n
eval (e :+ f) = eval e + eval f
eval (e :* f) = eval e * eval f
eval (ifZero c t e) with eval c
... | zero  = eval t
... | suc _ = eval e

module Feladat-5-Tesztek where
  _ : eval (lit 3 :+ lit 4 :* lit 5) ≡ 23
  _ = refl
  _ : eval ((lit 3 :+ lit 4) :* lit 5) ≡ 35
  _ = refl
  _ : eval (ifZero (lit 0) (lit 1) (lit 2)) ≡ 1
  _ = refl
  _ : eval (ifZero (lit 2 :* lit 0 :+ lit 1) (lit 1) (lit 2 :+ lit 2)) ≡ 4
  _ = refl

--------------------------
-- 6. FELADAT (1 + 4 pont)
--------------------------
interleave : {A : Set} → Stream A → Stream A → Stream A
head (interleave s t) = head s
tail (interleave s t) = interleave t (tail s)

everyOther : {A : Set} → Stream A → Stream A
head (everyOther s) = head s
tail (everyOther s) = everyOther (tail (tail s))

module Feladat-6-Tesztek where
  _ : Stream.List.take 6 (interleave Stream.[0-∞] (Stream.repeat 100)) ≡ 0 ∷ 100 ∷ 1 ∷ 100 ∷ 2 ∷ 100 ∷ []
  _ = refl
  _ : Stream.List.take 5 (everyOther Stream.[0-∞]) ≡ 0 ∷ 2 ∷ 4 ∷ 6 ∷ 8 ∷ []
  _ = refl
  _ : Stream.List.take 4 (everyOther (tail (interleave (Stream.repeat 7) Stream.[ 5 …]))) ≡ 5 ∷ 6 ∷ 7 ∷ 8 ∷ []
  _ = refl

--------------------------------
-- 7. FELADAT (2 + 0.5 + 4.5 pont)
--------------------------------
record StackMachine : Set where
  coinductive
  field
    top  : Maybe ℕ
    size : ℕ
    push : ℕ → StackMachine
    pop  : StackMachine
    add  : StackMachine
open StackMachine

stackMachine : List ℕ → StackMachine
top (stackMachine []) = nothing
top (stackMachine (x ∷ xs)) = just x
size (stackMachine xs) = List.length xs
push (stackMachine xs) n = stackMachine (n ∷ xs)
pop (stackMachine []) = stackMachine []
pop (stackMachine (x ∷ xs)) = stackMachine xs
add (stackMachine (x ∷ y ∷ xs)) = stackMachine (x + y ∷ xs)
add (stackMachine []) = stackMachine []
add (stackMachine (x ∷ [])) = stackMachine (x ∷ [])

module Feladat-7-Tesztek where
  s0 = stackMachine []
  s1 = push s0 3
  s2 = push s1 4
  s3 = push s2 10
  s4 = add s3
  s5 = add s4
  s6 = add s5
  s7 = pop s6
  s8 = pop s7
  _ : top s0 ≡ nothing
  _ = refl
  _ : size s3 ≡ 3
  _ = refl
  _ : top s3 ≡ just 10
  _ = refl
  _ : top s4 ≡ just 14
  _ = refl
  _ : size s4 ≡ 2
  _ = refl
  _ : top s5 ≡ just 17
  _ = refl
  _ : top s6 ≡ just 17
  _ = refl
  _ : size s7 ≡ 0
  _ = refl
  _ : top s8 ≡ nothing
  _ = refl
