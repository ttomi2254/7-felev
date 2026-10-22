{-# OPTIONS --safe --guardedness --no-postfix-projections --exact-split #-}

module ZH1Gyakorlo where

open import Lib hiding (curry; uncurry)

------------------------------------------------------------
-- L1: polimorf izomorfizmusok
------------------------------------------------------------
comm⊎ : {A B : Set} → A ⊎ B ↔ B ⊎ A
comm⊎ = sw , sw where
  sw : {X Y : Set} → X ⊎ Y → Y ⊎ X
  sw (inl x) = inr x
  sw (inr y) = inl y

idr× : {A : Set} → A × ⊤ ↔ A
idr× = (λ (a , _) → a) , (λ a → a , tt)

⊎→ : {A B C : Set} → (A ⊎ B → C) ↔ (A → C) × (B → C)
⊎→ = to , from where
  to : {A B C : Set} → (A ⊎ B → C) → (A → C) × (B → C)
  to f = (λ a → f (inl a)) , (λ b → f (inr b))
  from : {A B C : Set} → (A → C) × (B → C) → (A ⊎ B → C)
  from (g , h) (inl a) = g a
  from (g , h) (inr b) = h b

curry : {A B C : Set} → (A × B → C) ↔ (A → B → C)
curry = (λ f a b → f (a , b)) , (λ g (a , b) → g a b)

bool→ : {A : Set} → (Bool → A) ↔ A × A
bool→ = (λ f → f true , f false) , (λ (x , y) b → if b then x else y)

⊥→ : {A : Set} → (⊥ → A) ↔ ⊤
⊥→ = (λ _ → tt) , (λ _ ())

weird : {A B : Set} → (A ⊎ ⊥) × (⊤ → B) ↔ B × A
weird {A} {B} = to , from where
  to : (A ⊎ ⊥) × (⊤ → B) → B × A
  to (inl a , f) = f tt , a
  from : B × A → (A ⊎ ⊥) × (⊤ → B)
  from (b , a) = inl a , (λ _ → b)

------------------------------------------------------------
-- L2: véges izomorfizmusok
------------------------------------------------------------
bb : Bool × Bool ↔ Bool ⊎ Bool
bb = to , from where
  to : Bool × Bool → Bool ⊎ Bool
  to (true , b) = inl b
  to (false , b) = inr b
  from : Bool ⊎ Bool → Bool × Bool
  from (inl b) = true , b
  from (inr b) = false , b

mb : Bool ⊎ ⊤ ↔ Maybe Bool
mb = to , from where
  to : Bool ⊎ ⊤ → Maybe Bool
  to (inl b) = just b
  to (inr tt) = nothing
  from : Maybe Bool → Bool ⊎ ⊤
  from (just b) = inl b
  from nothing = inr tt

bt : (Bool → ⊤ ⊎ ⊤) ↔ Bool × Bool
bt = to , from where
  b2 : ⊤ ⊎ ⊤ → Bool
  b2 (inl tt) = true
  b2 (inr tt) = false
  t2 : Bool → ⊤ ⊎ ⊤
  t2 true = inl tt
  t2 false = inr tt
  to : (Bool → ⊤ ⊎ ⊤) → Bool × Bool
  to f = b2 (f true) , b2 (f false)
  from : Bool × Bool → (Bool → ⊤ ⊎ ⊤)
  from (x , y) b = if b then t2 x else t2 y

module _ where
  _ : snd bt (fst bt (λ b → if b then inr tt else inl tt)) true ≡ inr tt
  _ = refl
  _ : fst bt (snd bt (false , true)) ≡ (false , true)
  _ = refl

------------------------------------------------------------
-- L3: ℕ
------------------------------------------------------------
double : ℕ → ℕ
double n = ite-ℕ n 0 (λ k → suc (suc k))

pred'' : ℕ → ℕ
pred'' n = rec-ℕ n 0 (λ k _ → k)

isEven : ℕ → Bool
isEven n = ite-ℕ n true not

maxi : ℕ → ℕ → ℕ
maxi zero m = m
maxi (suc n) zero = suc n
maxi (suc n) (suc m) = suc (maxi n m)

pow : ℕ → ℕ → ℕ
pow a zero = 1
pow a (suc n) = a * pow a n

mod3 : ℕ → ℕ
mod3 zero = 0
mod3 (suc zero) = 1
mod3 (suc (suc zero)) = 2
mod3 (suc (suc (suc n))) = mod3 n

module _ where
  _ : double 7 ≡ 14
  _ = refl
  _ : pred'' 0 ≡ 0
  _ = refl
  _ : pred'' 8 ≡ 7
  _ = refl
  _ : isEven 7 ≡ false
  _ = refl
  _ : isEven 10 ≡ true
  _ = refl
  _ : maxi 3 9 ≡ 9
  _ = refl
  _ : pow 2 10 ≡ 1024
  _ = refl
  _ : mod3 14 ≡ 2
  _ = refl

------------------------------------------------------------
-- L4: listák
------------------------------------------------------------
sum : List ℕ → ℕ
sum [] = 0
sum (x ∷ xs) = x + sum xs

tails : {A : Set} → List A → List (List A)
tails [] = [] ∷ []
tails (x ∷ xs) = (x ∷ xs) ∷ tails xs

myFilter : {A : Set} → (A → Bool) → List A → List A
myFilter p [] = []
myFilter p (x ∷ xs) = if p x then x ∷ myFilter p xs else myFilter p xs

zipL : {A B : Set} → List A → List B → List (A × B)
zipL [] ys = []
zipL (x ∷ xs) [] = []
zipL (x ∷ xs) (y ∷ ys) = (x , y) ∷ zipL xs ys

count : {A : Set} → ⦃ Eq A ⦄ → A → List A → ℕ
count a [] = 0
count a (x ∷ xs) = if a == x then suc (count a xs) else count a xs

rev : {A : Set} → List A → List A
rev xs = go xs [] where
  go : {A : Set} → List A → List A → List A
  go [] acc = acc
  go (y ∷ ys) acc = go ys (y ∷ acc)

lastM : {A : Set} → List A → Maybe A
lastM [] = nothing
lastM (x ∷ []) = just x
lastM (x ∷ y ∷ xs) = lastM (y ∷ xs)

module _ where
  _ : sum (1 ∷ 2 ∷ 3 ∷ []) ≡ 6
  _ = refl
  _ : tails {ℕ} (1 ∷ 2 ∷ []) ≡ (1 ∷ 2 ∷ []) ∷ (2 ∷ []) ∷ [] ∷ []
  _ = refl
  _ : myFilter even (1 ∷ 2 ∷ 3 ∷ 4 ∷ []) ≡ 2 ∷ 4 ∷ []
  _ = refl
  _ : zipL {ℕ} {Bool} (1 ∷ 2 ∷ 3 ∷ []) (true ∷ false ∷ []) ≡ (1 , true) ∷ (2 , false) ∷ []
  _ = refl
  _ : count {ℕ} 3 (3 ∷ 1 ∷ 3 ∷ 3 ∷ []) ≡ 3
  _ = refl
  _ : rev {ℕ} (1 ∷ 2 ∷ 3 ∷ []) ≡ 3 ∷ 2 ∷ 1 ∷ []
  _ = refl
  _ : lastM {ℕ} (1 ∷ 2 ∷ 3 ∷ []) ≡ just 3
  _ = refl

------------------------------------------------------------
-- L5: saját adattípusok
------------------------------------------------------------
data Tree (A : Set) : Set where
  empty : Tree A
  node  : Tree A → A → Tree A → Tree A

size : {A : Set} → Tree A → ℕ
size empty = 0
size (node l _ r) = suc (size l + size r)

mirror : {A : Set} → Tree A → Tree A
mirror empty = empty
mirror (node l a r) = node (mirror r) a (mirror l)

preorder : {A : Set} → Tree A → List A
preorder empty = []
preorder (node l a r) = a ∷ (preorder l List.++ preorder r)

data NonEmpty (A : Set) : Set where
  [_]  : A → NonEmpty A
  _∷⁺_ : A → NonEmpty A → NonEmpty A
infixr 5 _∷⁺_

toList : {A : Set} → NonEmpty A → List A
toList [ a ] = a ∷ []
toList (a ∷⁺ as) = a ∷ toList as

maxNE : NonEmpty ℕ → ℕ
maxNE [ a ] = a
maxNE (a ∷⁺ as) = maxi a (maxNE as)

data Rose (A : Set) : Set where
  rose : A → List (Rose A) → Rose A

module _ where
  t : Tree ℕ
  t = node (node empty 1 empty) 2 (node empty 3 (node empty 4 empty))
  _ : size t ≡ 4
  _ = refl
  _ : preorder (mirror t) ≡ 2 ∷ 3 ∷ 4 ∷ 1 ∷ []
  _ = refl
  _ : maxNE (3 ∷⁺ 9 ∷⁺ [ 4 ]) ≡ 9
  _ = refl
  _ : toList {ℕ} (1 ∷⁺ [ 2 ]) ≡ 1 ∷ 2 ∷ []
  _ = refl

------------------------------------------------------------
-- L6: Stream
------------------------------------------------------------
from : ℕ → Stream ℕ
head (from n) = n
tail (from n) = from (suc n)

fibFrom : ℕ → ℕ → Stream ℕ
head (fibFrom a b) = a
tail (fibFrom a b) = fibFrom b (a + b)

zipWithS : {A B C : Set} → (A → B → C) → Stream A → Stream B → Stream C
head (zipWithS f s t) = f (head s) (head t)
tail (zipWithS f s t) = zipWithS f (tail s) (tail t)

partialSums : Stream ℕ → Stream ℕ
partialSums s = go 0 s where
  go : ℕ → Stream ℕ → Stream ℕ
  head (go acc s) = acc + head s
  tail (go acc s) = go (acc + head s) (tail s)

diagonal : {A : Set} → Stream (Stream A) → Stream A
head (diagonal m) = head (head m)
tail (diagonal m) = diagonal (Stream.map tail (tail m))

module _ where
  _ : Stream.List.take 3 (from 5) ≡ 5 ∷ 6 ∷ 7 ∷ []
  _ = refl
  _ : Stream.List.take 7 (fibFrom 0 1) ≡ 0 ∷ 1 ∷ 1 ∷ 2 ∷ 3 ∷ 5 ∷ 8 ∷ []
  _ = refl
  _ : Stream.List.take 4 (partialSums (from 1)) ≡ 1 ∷ 3 ∷ 6 ∷ 10 ∷ []
  _ = refl
  _ : Stream.List.take 3 (diagonal (Stream.map (λ i → Stream.map (λ j → i * 10 + j) (from 0)) (from 0))) ≡ 0 ∷ 11 ∷ 22 ∷ []
  _ = refl
  _ : Stream.List.take 3 (zipWithS _+_ (from 0) (from 10)) ≡ 10 ∷ 12 ∷ 14 ∷ []
  _ = refl

------------------------------------------------------------
-- L7: koinduktív gépek
------------------------------------------------------------
record Counter : Set where
  coinductive
  field
    value : ℕ
    inc   : Counter
    dec   : Counter
    reset : Counter
open Counter

counter : ℕ → Counter
value (counter n) = n
inc (counter n) = counter (suc n)
dec (counter n) = counter (pred' n)
reset (counter n) = counter 0

record Account : Set where
  coinductive
  field
    balance  : ℕ
    deposit  : ℕ → Account
    withdraw : ℕ → Account
open Account

-- csonkolt kivonás (a Lib _-_ művelete bizonyítékot kér, ezért sajátot írunk)
monus : ℕ → ℕ → ℕ
monus n zero = n
monus zero (suc m) = zero
monus (suc n) (suc m) = monus n m

account : ℕ → Account
balance (account b) = b
deposit (account b) n = account (b + n)
withdraw (account b) n = account (if n ≤ᵇ b then monus b n else b)

module _ where
  _ : value (dec (dec (inc (inc (inc (counter 0)))))) ≡ 1
  _ = refl
  _ : value (dec (reset (inc (counter 5)))) ≡ 0
  _ = refl
  _ : balance (withdraw (deposit (account 10) 5) 12) ≡ 3
  _ = refl
  _ : balance (withdraw (account 10) 11) ≡ 10
  _ = refl
